#include <napi.h>
#include <Windows.h>
#include <direct.h>
#include <string>
typedef
struct _BeaconInfo
{
	unsigned long long id;
	int           rssi_tx;
	double        x;
	double        y;
	double        h;
}
BeaconInfo;

typedef
struct _ScanInfo
{
	unsigned long long id;
	int           rssi;
	int           time;
}
ScanInfo;
typedef
int(*GetPos)(
	unsigned long long userId,
	const ScanInfo*    si,
	int                c_si,
	const BeaconInfo*  bi,
	int                c_bi,
	double*			  xyz
	);

Napi::Value BLE(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
	std::string dllPath = info[1].ToString();
	HINSTANCE hdll = LoadLibrary(dllPath.c_str());
	if (hdll == NULL) {
		//Unable to load smartpos.dll;
		Napi::Object err = Napi::Object::New(env);
		err.Set("code", "DllError");
		err.Set("codeNo", 915);
		err.Set("type", "error");
		err.Set("sysCall", "LoadLibrary");
		err.Set("message", dllPath);
		printf("LoadLibrary-GetLastError:%d\n",GetLastError());
		return err;
	}
	GetPos getPos = (GetPos) ::GetProcAddress(hdll, "getPos_v2");
	if (getPos == NULL) {
		//Unable to find function getPos() in smartpos.dll;
		::FreeLibrary(hdll);
		Napi::Object err = Napi::Object::New(env);
		err.Set("code", "DllError");
		err.Set("codeNo", 915);
		err.Set("type", "error");
		err.Set("sysCall", "GetProcAddress");
		err.Set("message", GetLastError());
		printf("GetProcAddress-GetLastError:%d\n",GetLastError());
		return err;
	}

	BeaconInfo bi[20];
	ScanInfo si[20];
	Napi::Object obj = info[0].As<Napi::Object>();
	Napi::Value oneAry;
	Napi::Object oneObj;
	Napi::Value ary = obj.Get("bi");
	int biSize = obj.Get("biSize").As<Napi::Number>().Int32Value();
	if (biSize > 20) biSize = 20;
	for (int i = 0; i < biSize; i++)
	{
		oneAry = ary.As<Napi::Array>()[i];
		oneObj = oneAry.As<Napi::Object>();
		bi[i].id = oneObj.Get("beaconId").As<Napi::Number>().Int64Value();
		bi[i].x = oneObj.Get("lati").As<Napi::Number>().DoubleValue();
		bi[i].y = oneObj.Get("longi").As<Napi::Number>().DoubleValue();
		bi[i].h = oneObj.Get("alti").As<Napi::Number>().DoubleValue();
		bi[i].rssi_tx = oneObj.Get("calibration").As<Napi::Number>().Int32Value();
	}
	ary = obj.Get("si");
	int siSize = obj.Get("siSize").As<Napi::Number>().Int32Value();
	if (siSize > 20) siSize = 20;
	for (int i = 0; i < siSize; i++)
	{
		oneAry = ary.As<Napi::Array>()[i];
		oneObj = oneAry.As<Napi::Object>();
		si[i].id = oneObj.Get("beaconId").As<Napi::Number>().Int64Value();
		si[i].time = oneObj.Get("scanTime").As<Napi::Number>().Int32Value();
		si[i].rssi = oneObj.Get("rssi").As<Napi::Number>().Int32Value();
	}
	unsigned long long userId = obj.Get("userId").As<Napi::Number>().Int64Value();
	double xyz[3] = { 0 };
	int pos = getPos(userId,si, siSize, bi, biSize, xyz);
	::FreeLibrary(hdll);
	if (pos < 0) {
		Napi::Object err = Napi::Object::New(env);
		err.Set("code", "computeError");
		err.Set("codeNo", 909);
		err.Set("type", "warn");
		err.Set("sysCall", "getPos");
		err.Set("message", pos);
		return err;
	}
	else {
		Napi::Object ret = Napi::Object::New(env);
		ret.Set("code", 960);
		ret.Set("lati", xyz[0]);
		ret.Set("longi", xyz[1]);
		ret.Set("alti", xyz[2]);
		return ret;
	}
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set(Napi::String::New(env, "ble"),
		Napi::Function::New(env, BLE));
	return exports;
}

NODE_API_MODULE(addon, Init)
