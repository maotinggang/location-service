#include <napi.h>
#include <Windows.h>
#include <direct.h>
#include <string>
#include "smartpos_t2.h"
#pragma comment(lib, "C:\\Users\\Mg\\Documents\\vscode\\ls-napi\\smartpos_lib.lib")

Napi::Value BLE(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
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
	int pos = getPos_v2(userId,si, siSize, bi, biSize, xyz);
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
