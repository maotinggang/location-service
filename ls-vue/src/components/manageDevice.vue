<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand text-primary" href="/">
        <h3>SmartSpace</h3>
      </a>
      <ul class="navbar-nav mr-auto">
        <li>
          <a @click="isListMap=false" class="dropdown-item" href="#">设备参数</a>
        </li>
        <li>
          <a @click="isListMap=true" class="dropdown-item" href="#">设备地图</a>
        </li>
        <li>
          <a @click="dataList=[]" class="dropdown-item" href="#">清空列表</a>
        </li>
        <li>
          <a @click="$_openBatch()" class="dropdown-item" href="#">批量操作
            <span v-show="isBatch" class="text-danger">(已开启)</span>
          </a>
        </li>
      </ul>
      <span :class="operateInfoColor" class="navbar-text">
        {{operateInfo}}
      </span>
    </nav>
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-4">
          <h6 class="text-center">设备列表</h6>
          <hr>
          <div style="overflow: scroll;overflow-x: hidden;height: 800px;">
            <table class="table table-sm table-hover text-center" style="width: 95%;margin: auto">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>
                    <a @click="$_orderType()" href="#" class="text-dark">TYPE</a>
                  </th>
                  <th>
                    <a @click="$_orderId()" href="#" class="text-dark">ID</a>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataList" :key="index">
                  <th>{{index+1}}</th>
                  <td>{{item.type}}</td>
                  <td>
                    <a @click="$_pickOne(item)" onclick="this.setAttribute('class','text-dark')" href="#">{{item.id}}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-8 pl-0 pr-0">
          <div v-if="isListMap">
            <div class="bg-white">
              <h6 class="text-center">设备地图</h6>
              <hr>
            </div>
            <display-map :dataList="dataList" :dataOneMap="dataOneMap" :isMarkAll="true"></display-map>
          </div>
          <div v-else>
            <h6 class="text-center">设备参数</h6>
            <hr>
            <div class="form-group" style="width: 95%;margin: auto">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white text-danger">设备号</span>
                </div>
                <input v-model.trim="dataOne.id" :disabled="isBatch" type="text" class="form-control" placeholder="id">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white text-danger">设备类型</span>
                </div>
                <select v-model="dataOne.type" :disabled="isBatch" class="custom-select ">
                  <option value="" disabled>device type</option>
                  <option value="beacon">beacon</option>
                </select>
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white text-danger">纬度</span>
                </div>
                <input v-model.number="dataOne.lati" :disabled="isBatch" type="text" class="form-control " placeholder="latitude">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white text-danger">经度</span>
                </div>
                <input v-model.number="dataOne.longi" :disabled="isBatch" type="text" class="form-control " placeholder="longitude">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">水平精度</span>
                </div>
                <input v-model.number="dataOne.accuracy" :disabled="isBatch" type="text" class="form-control " placeholder="accuracy">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">海拔</span>
                </div>
                <input v-model.number="dataOne.alti" :disabled="isBatch" type="text" class="form-control " placeholder="altitude">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">高程精度</span>
                </div>
                <input v-model.number="dataOne.alti_accuracy" :disabled="isBatch" type="text" class="form-control " placeholder="altitude accuracy">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white text-danger">信号强度校准</span>
                </div>
                <input v-model.number="dataOne.calibration" :disabled="isBatch" type="text" class="form-control " placeholder="RSSI calibration">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">电量</span>
                </div>
                <input v-model.number="dataOne.soc" :disabled="isBatch" type="text" class="form-control" placeholder="soc">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">具体位置</span>
                </div>
                <input v-model.trim="dataOne.location" :disabled="isBatch" type="text" class="form-control " placeholder="location">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">设备公司</span>
                </div>
                <input v-model.trim="dataOne.company" :disabled="isBatch" type="text" class="form-control " placeholder="company">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white text-danger">注册码</span>
                </div>
                <input v-model.trim="dataOne.regist_code" :disabled="isBatch" type="tel" class="form-control " placeholder="regist code">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">其他信息</span>
                </div>
                <input v-model.trim="dataOne.info" :disabled="isBatch" type="email" class="form-control " placeholder="info">
              </div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-white">安装时间</span>
                </div>
                <input v-model.trim="dataOne.create_time" :disabled="isBatch" type="email" class="form-control " placeholder="create time">
              </div>
              <hr v-show="isBatch">
              <div v-show="isBatch" class="input-group mb-3">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="batchFile" accept=".csv,.txt">
                  <label class="custom-file-label" for="batchFile">{{batchFilename}}</label>
                </div>
                <div class="input-group-append">
                  <button @click="$_batchFile" class="btn btn-outline-secondary" type="button">加载</button>
                </div>
              </div>
              <hr>
              <button :class="{disabled:isDisabled}" @click="$_select" class="btn btn-outline-info">{{operateButton.select}}</button>
              <div class="float-right mb-3">
                <button :class="{disabled:isDisabled}" @click="$_insert" class="btn btn-outline-primary">{{operateButton.insert}}</button>&nbsp;&nbsp;
                <button :class="{disabled:isDisabled}" @click="$_update" class="btn btn-outline-warning">{{operateButton.update}}</button>&nbsp;&nbsp;
                <button :class="{disabled:isDisabled}" @click="$_delete" class="btn btn-outline-danger">{{operateButton.delete}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lodashArray from 'lodash/array'
import displayMap from './displayMap'
export default {
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('user')),
      isBatch: false,
      isDisabled: false,
      isListMap: false,
      operateButton: {
        select: '查询',
        insert: '添加',
        update: '修改',
        delete: '删除'
      },
      batchFilename: '选择批量处理文件',
      dataList: [],
      dataOne: {
        id: '',
        type: '',
        lati: '',
        longi: '',
        accuracy: '',
        alti: '',
        alti_accuracy: '',
        calibration: '',
        soc: '',
        location: '',
        company: '',
        regist_code: '',
        info: '',
        create_time: ''
      },
      dataOneMap: {},
      operateInfo: '当前位置：设备管理',
      operateInfoColor: '',
      isAscend: true
    }
  },
  // created() {
  //   let dataList = []
  //   for (let index = 0; index < 5; index++) {
  //     let dataOne = {
  //       id: index,
  //       type: 'beacon',
  //       lati: 31.21515044 + 0.0005 * index,
  //       longi: 121.5273285 + 0.0005 * index,
  //       accuracy: '',
  //       alti: 12.1,
  //       alti_accuracy: '',
  //       calibration: '',
  //       soc: '',
  //       location: '',
  //       company: '',
  //       regist_code: '',
  //       info: '',
  //       create_time: ''
  //     }
  //     dataList.push(dataOne)
  //   }
  //   this.dataList = dataList
  // },
  components: {
    'display-map': displayMap
  },
  methods: {
    $_getBatchData(type) {
      let ret = []
      if (type == 'insert' || type == 'update') {
        this.dataList.forEach(element => {
          let tempData = {}
          if (element.id) tempData.id = element.id
          if (element.type) tempData.type = element.type
          if (element.lati) tempData.lati = element.lati
          if (element.longi) tempData.longi = element.longi
          if (element.accuracy) tempData.accuracy = element.accuracy
          if (element.alti) tempData.alti = element.alti
          if (element.alti_accuracy)
            tempData.alti_accuracy = element.alti_accuracy
          if (element.calibration) tempData.calibration = element.calibration
          if (element.soc) tempData.soc = element.soc
          if (element.location) tempData.location = element.location
          if (element.company) tempData.company = element.company
          if (element.regist_code) tempData.regist_code = element.regist_code
          if (element.info) tempData.info = element.info
          ret = ret.concat(tempData)
        })
      }
      return ret
    },
    $_getSendData(type) {
      let sendData = {
        user: {
          type: 'user',
          id: this.currentUser.username,
          code: this.currentUser.password
        }
      }
      if (this.isBatch) {
        switch (type) {
          case 'select': {
            let idArray = []
            this.dataList.forEach(element => {
              idArray = idArray.concat(element.id)
            })
            sendData.select = {
              type: this.dataList[0].type,
              id: idArray
            }
            break
          }
          case 'insert':
            sendData.insert = this.$_getBatchData('insert')
            break
          case 'update':
            sendData.update = this.$_getBatchData('update')
            break
          case 'delete': {
            let idArray = []
            this.dataList.forEach(element => {
              idArray = idArray.concat(element.id)
            })
            sendData.delete = {
              type: this.dataList[0].type,
              id: idArray
            }
            break
          }
          default:
            break
        }
      } else {
        let tempData = {}
        if (this.dataOne.id) tempData.id = this.dataOne.id
        if (this.dataOne.type) tempData.type = this.dataOne.type
        if (this.dataOne.lati) tempData.lati = this.dataOne.lati
        if (this.dataOne.longi) tempData.longi = this.dataOne.longi
        if (this.dataOne.longi) tempData.accuracy = this.dataOne.longi
        if (this.dataOne.alti) tempData.alti = this.dataOne.alti
        if (this.dataOne.alti_accuracy)
          tempData.alti_accuracy = this.dataOne.alti_accuracy
        if (this.dataOne.calibration)
          tempData.calibration = this.dataOne.calibration
        if (this.dataOne.soc) tempData.soc = this.dataOne.soc
        if (this.dataOne.location) tempData.location = this.dataOne.location
        if (this.dataOne.company) tempData.company = this.dataOne.company
        if (this.dataOne.regist_code)
          tempData.regist_code = this.dataOne.regist_code
        if (this.dataOne.info) tempData.info = this.dataOne.info
        switch (type) {
          case 'select':
            sendData.select = {
              type: this.dataOne.type,
              id: [this.dataOne.id]
            }
            break
          case 'insert':
            sendData.insert = [tempData]
            break
          case 'update':
            sendData.update = [tempData]
            break
          case 'delete':
            sendData.delete = {
              type: this.dataOne.type,
              id: [this.dataOne.id]
            }
            break
          default:
            break
        }
      }
      return sendData
    },
    $_orderType() {
      if (this.isAscend) {
        this.dataList.sort(function(a, b) {
          if (a.type > b.type) return 1
          else if (a.type < b.type) return -1
          else return 0
        })
      } else {
        this.dataList.sort(function(a, b) {
          if (b.type > a.type) return 1
          else if (b.type < a.type) return -1
          else return 0
        })
      }
      this.operateInfoColor = 'text-success'
      if (this.isAscend) this.operateInfo = '排序成功：类型升序'
      else this.operateInfo = '排序成功：类型降序'
      this.isAscend = !this.isAscend
    },
    $_orderId() {
      if (this.isAscend) {
        this.dataList.sort(function(a, b) {
          if (a.id > b.id) return 1
          else if (a.id < b.id) return -1
          else return 0
        })
      } else {
        this.dataList.sort(function(a, b) {
          if (b.id > a.id) return 1
          else if (b.id < a.id) return -1
          else return 0
        })
      }
      this.operateInfoColor = 'text-success'
      if (this.isAscend) this.operateInfo = '排序成功：账号升序'
      else this.operateInfo = '排序成功：账号降序'
      this.isAscend = !this.isAscend
    },
    $_select() {
      if (!this.isBatch) {
        if (!this.dataOne.id) {
          this.operateInfo = '查询失败：请填写设备号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.type) {
          this.operateInfo = '查询失败：请选择设备类型'
          this.operateInfoColor = 'text-danger'
          return
        }
      }
      this.isDisabled = true
      this.operateInfo = '查询操作：正在查询'
      this.operateInfoColor = 'text-dark'
      axios({
        // eslint-disable-line
        method: 'post',
        url: '/api/manage/select',
        data: this.$_getSendData('select'),
        timeout: 10000
      })
        .then(result => {
          this.isDisabled = false
          if (result.data.general.type === 'select') {
            if (result.data.general.state) {
              lodashArray.remove(this.dataList, n => {
                return n.id == this.dataOne.id
              })
              this.dataList = this.dataList.concat(result.data.general.message)
              if (this.isBatch) this.operateInfo = '查询成功：批量查询'
              else this.operateInfo = '查询成功：' + this.dataOne.id
              this.operateInfoColor = 'text-success'
            } else if (result.data.general.message == 'queryNull') {
              this.operateInfo = '查询成功：账号不存在'
              this.operateInfoColor = 'text-warning'
            } else {
              this.operateInfo = '查询失败：' + result.data.general.message
              this.operateInfoColor = 'text-danger'
            }
          } else {
            this.operateInfo = '查询失败：未知错误'
            this.operateInfoColor = 'text-danger'
          }
        })
        .catch(err => {
          this.isDisabled = false
          document.writeln(err)
          document.close()
        })
    },
    $_insert() {
      if (!this.isBatch) {
        if (!this.dataOne.id) {
          this.operateInfo = '添加失败：请填写设备号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.type) {
          this.operateInfo = '添加失败：请选择设备类型'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.lati) {
          this.operateInfo = '添加失败：请填写纬度'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.longi) {
          this.operateInfo = '添加失败：请填写经度'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.calibration) {
          this.operateInfo = '添加失败：请填信号强度校准'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.regist_code) {
          this.operateInfo = '添加失败：请填注册码'
          this.operateInfoColor = 'text-danger'
          return
        }
      }
      this.isDisabled = true
      let sendData = this.$_getSendData('insert')
      axios({
        // eslint-disable-line
        method: 'post',
        url: '/api/manage/insert',
        data: sendData,
        timeout: 10000
      })
        .then(result => {
          this.isDisabled = false
          if (result.data.general.type === 'insert') {
            if (result.data.general.state) {
              if (this.isBatch) {
                this.operateInfo = '添加成功：批量添加'
              } else {
                this.dataList.push(sendData.insert[0])
                this.operateInfo = '添加成功：' + this.dataOne.id
              }
              this.operateInfoColor = 'text-success'
            } else if (result.data.general.message == 'idExisted') {
              this.operateInfo = '添加失败：此设备已存在'
              this.operateInfoColor = 'text-danger'
            } else {
              this.operateInfo = '添加失败：' + result.data.general.message
              this.operateInfoColor = 'text-danger'
            }
          } else {
            this.operateInfo = '添加失败：未知错误'
            this.operateInfoColor = 'text-danger'
          }
        })
        .catch(err => {
          this.isDisabled = false
          document.writeln(err)
          document.close()
        })
    },
    $_update() {
      if (!this.isBatch) {
        if (!this.dataOne.id) {
          this.operateInfo = '修改失败：请填写设备号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.type) {
          this.operateInfo = '添加失败：请选择设备类型'
          this.operateInfoColor = 'text-danger'
          return
        }
      }
      this.isDisabled = true
      axios({
        // eslint-disable-line
        method: 'post',
        url: '/api/manage/update',
        data: this.$_getSendData('update'),
        timeout: 10000
      })
        .then(result => {
          this.isDisabled = false
          if (result.data.general.type === 'update') {
            if (result.data.general.state) {
              if (this.isBatch) {
                this.operateInfo = '修改成功：批量修改'
              } else {
                for (let index = 0; index < this.dataList.length; index++) {
                  const element = this.dataList[index]
                  if (element.id == this.dataOne.id) {
                    element.type = this.dataOne.type
                    element.lati = this.dataOne.lati
                    element.longi = this.dataOne.longi
                    element.accuracy = this.dataOne.longi
                    element.alti = this.dataOne.alti
                    element.alti_accuracy = this.dataOne.alti_accuracy
                    element.calibration = this.dataOne.calibration
                    element.soc = this.dataOne.soc
                    element.location = this.dataOne.location
                    element.company = this.dataOne.company
                    element.regist_code = this.dataOne.regist_code
                    element.info = this.dataOne.info
                    element.create_time = this.dataOne.create_time
                    break
                  }
                }
                this.operateInfo = '修改成功：' + this.dataOne.id
              }
              this.operateInfoColor = 'text-success'
            } else {
              this.operateInfo = '修改失败：' + result.data.general.message
              this.operateInfoColor = 'text-danger'
            }
          } else {
            this.operateInfo = '修改失败：未知错误'
            this.operateInfoColor = 'text-danger'
          }
        })
        .catch(err => {
          this.isDisabled = false
          document.writeln(err)
          document.close()
        })
    },
    $_delete() {
      if (!this.isBatch) {
        if (!this.dataOne.id) {
          this.operateInfo = '删除失败：请填写设备号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.dataOne.type) {
          this.operateInfo = '添加失败：请选择设备类型'
          this.operateInfoColor = 'text-danger'
          return
        }
      }
      this.isDisabled = true
      axios({
        // eslint-disable-line
        method: 'post',
        url: '/api/manage/delete',
        data: this.$_getSendData('delete'),
        timeout: 10000
      })
        .then(result => {
          this.isDisabled = false
          if (result.data.general.type === 'delete') {
            if (result.data.general.state) {
              if (this.isBatch) {
                this.dataList = []
                this.operateInfo = '删除成功：批量删除'
              } else {
                this.operateInfo = '删除成功：' + this.dataOne.id
                lodashArray.remove(this.dataList, n => {
                  return n.id == this.dataOne.id
                })
              }
              this.operateInfoColor = 'text-success'
            } else if (result.data.general.message == 'queryNull') {
              this.operateInfo = '删除失败：此账号不存在'
              this.operateInfoColor = 'text-danger'
            } else {
              this.operateInfo = '删除失败：' + result.data.general.message
              this.operateInfoColor = 'text-danger'
            }
          } else {
            this.operateInfo = '删除失败：未知错误'
            this.operateInfoColor = 'text-danger'
          }
        })
        .catch(err => {
          this.isDisabled = false
          document.writeln(err)
          document.close()
        })
    },
    $_pickOne(device) {
      this.dataOne.id = device.id
      this.dataOne.type = device.type
      this.dataOne.lati = device.lati
      this.dataOne.longi = device.longi
      this.dataOne.accuracy = device.accuracy
      this.dataOne.alti = device.alti
      this.dataOne.alti_accuracy = device.alti_accuracy
      this.dataOne.calibration = device.calibration
      this.dataOne.soc = device.soc
      this.dataOne.location = device.location
      this.dataOne.company = device.company
      this.dataOne.regist_code = device.regist_code
      this.dataOne.info = device.info
      this.dataOne.create_time = device.create_time
      if (this.isListMap) {
        this.dataOneMap = {
          position: [device.longi, device.lati + 0.0003],
          content: `<div class="prompt"><h6>设备:${device.id}</h6>
          <h6>经度:${device.longi.toFixed(6)}</h6>
          <h6>纬度:${device.lati.toFixed(6)}</h6></div>`,
          visible: true
        }
      }
      this.operateInfoColor = ''
      this.operateInfo = '当前选择：' + device.id
    },
    $_openBatch() {
      this.isBatch = !this.isBatch
      if (this.isBatch) {
        this.operateButton = {
          select: '批量查询',
          insert: '批量添加',
          update: '批量修改',
          delete: '批量删除'
        }
        this.operateInfoColor = 'text-warning'
        this.batchFilename = '选择批量处理文件'
        this.operateInfo = '操作切换：批量操作'
      } else {
        this.operateButton = {
          select: '查询',
          insert: '添加',
          update: '修改',
          delete: '删除'
        }
        this.operateInfoColor = 'text-success'
        this.operateInfo = '操作切换：普通操作'
      }
    },
    $_batchFile() {
      let fileInput = document.getElementById('batchFile'),
        file = fileInput.files[0]
      if (!file) {
        this.operateInfoColor = 'text-danger'
        this.operateInfo = '加载文件：请选择批量文件'
        return
      }
      this.batchFilename = file.name
      let reader = new FileReader(),
        fileList = []
      reader.onload = function() {
        let fileDatas = this.result.split('\n')
        let colName = fileDatas.shift(),
          colNames = colName.split(','),
          colNamesLen = colNames.length
        if (colNamesLen > 5) {
          for (let index = 0; index < fileDatas.length; index++) {
            const temp = fileDatas[index].split(',')
            if (temp.length != colNamesLen) {
              fileList = null
              break
            }
            let tempObject = {}
            for (let index = 0; index < colNamesLen; index++)
              tempObject[colNames[index].trim()] = temp[index].trim()
            fileList.push(tempObject)
          }
        }
      }
      reader.readAsText(file)
      this.dataList = fileList
    }
  }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
</style>