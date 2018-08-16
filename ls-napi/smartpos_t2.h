#pragma once

#ifdef _WINDOWS
#define SMARTSPACE_API extern "C" __declspec (dllexport)
#else
#define SMARTSPACE_API extern "C"
#endif

typedef
struct _BeaconInfo
{
	unsigned long long id;       // BCN��ʶ������MAC ID��ע�⣺0Ϊ�Ƿ�ID
	int                rssi_tx;	 // �ο����书��
	double             x;        // ��װλ������
	double             y;
	double             h;        // ��װ�߶Ȼ�¥��

	//_BeaconInfo() { id = 0; x = 0; y = 0; h = 0; }
	//_BeaconInfo(unsigned long long _id, double _x, double _y, double _h) { id = _id; x = _x; y = _y; h = _h; }
}
BeaconInfo;

typedef
struct _ScanInfo
{
	unsigned long long id;	     // BCN��ʶ��ע�⣺0Ϊ�Ƿ�ID
	int                rssi;     // �����ź�ǿ��
	unsigned int       time;     // ʱ����Ϣ����λsec��1970/01/01 00:00:00���������
}
ScanInfo;


/*
 * ��λ�㷨
 * Beacon�̶���װ�������ն˽��յ���Beacon�źţ����ն˽��ж�λ
 * @param si,	 Beaconɨ����Ϣ
 * @param c_si,  ����ɨ����Ϣ����
 * @param bi,    Beacon������Ϣ
 * @param c_si,  ����������Ϣ����
 * @param xy,    ��λ�������λ��λ�����꣬xy[0] - x����ֵ��xy[1] - y����ֵ��xy[2] - �߶���Ϣ������ϵ��Beacon��װλ������ϵһ��
 * @return ��λ״̬��С��0 - �޷���λ������ - ��λ�ɹ�
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
 * ��λ�㷨
 * Beacon�̶���װ�������ն˽��յ���Beacon�źţ����ն˽��ж�λ
 * @parma user,  �û�ID
 * @param si,	 Beaconɨ����Ϣ
 * @param c_si,  ����ɨ����Ϣ����
 * @param bi,    Beacon������Ϣ
 * @param c_si,  ����������Ϣ����
 * @param xy,    ��λ�������λ��λ�����꣬xy[0] - x����ֵ��xy[1] - y����ֵ��xy[2] - �߶���Ϣ������ϵ��Beacon��װλ������ϵһ��
 * @return ��λ״̬��С��0 - �޷���λ������ - ��λ�ɹ�
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
 * �㷨��汾��
 * �汾�Ÿ�ʽ��Va.b.c������aΪmajor��bΪminor��cΪrevision
 * @return �汾��v��a=(v>>24)&0x000000FF��b=(v>>16)&0x000000FF��c=(v)&0x0000FFFF
 */
SMARTSPACE_API
int version(void);
