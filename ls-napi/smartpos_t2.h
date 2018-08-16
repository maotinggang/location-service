#pragma once

#ifdef _WINDOWS
#define SMARTSPACE_API extern "C" __declspec (dllexport)
#else
#define SMARTSPACE_API extern "C"
#endif

typedef
struct _BeaconInfo
{
	unsigned long long id;       // BCN标识，比如MAC ID。注意：0为非法ID
	int                rssi_tx;	 // 参考发射功率
	double             x;        // 安装位置坐标
	double             y;
	double             h;        // 安装高度或楼层

	//_BeaconInfo() { id = 0; x = 0; y = 0; h = 0; }
	//_BeaconInfo(unsigned long long _id, double _x, double _y, double _h) { id = _id; x = _x; y = _y; h = _h; }
}
BeaconInfo;

typedef
struct _ScanInfo
{
	unsigned long long id;	     // BCN标识。注意：0为非法ID
	int                rssi;     // 接收信号强度
	unsigned int       time;     // 时间信息，单位sec，1970/01/01 00:00:00至今的秒数
}
ScanInfo;


/*
 * 定位算法
 * Beacon固定安装，根据终端接收到的Beacon信号，对终端进行定位
 * @param si,	 Beacon扫描信息
 * @param c_si,  上述扫描信息数量
 * @param bi,    Beacon基本信息
 * @param c_si,  上述基本信息数量
 * @param xy,    定位结果，定位的位置坐标，xy[0] - x坐标值，xy[1] - y坐标值，xy[2] - 高度信息。坐标系与Beacon安装位置坐标系一致
 * @return 定位状态，小于0 - 无法定位，其他 - 定位成功
 * @copyright (C) 2017 Smartspace Technologies
 */
SMARTSPACE_API
int getPos(
	const ScanInfo*    si,
	int                c_si,
	const BeaconInfo*  bi,
	int                c_bi,
	double*			  xy
);

/*
 * 定位算法
 * Beacon固定安装，根据终端接收到的Beacon信号，对终端进行定位
 * @parma user,  用户ID
 * @param si,	 Beacon扫描信息
 * @param c_si,  上述扫描信息数量
 * @param bi,    Beacon基本信息
 * @param c_si,  上述基本信息数量
 * @param xy,    定位结果，定位的位置坐标，xy[0] - x坐标值，xy[1] - y坐标值，xy[2] - 高度信息。坐标系与Beacon安装位置坐标系一致
 * @return 定位状态，小于0 - 无法定位，其他 - 定位成功
 * @copyright (C) 2018 Smartspace Technologies
 */
SMARTSPACE_API
int getPos_v2(
	unsigned long long user,
	const ScanInfo*    si,
	int                c_si,
	const BeaconInfo*  bi,
	int                c_bi,
	double*			  xy
);

/*
 * 算法库版本号
 * 版本号格式：Va.b.c，其中a为major，b为minor，c为revision
 * @return 版本号v，a=(v>>24)&0x000000FF，b=(v>>16)&0x000000FF，c=(v)&0x0000FFFF
 */
SMARTSPACE_API
int version(void);
