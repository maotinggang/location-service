<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand text-primary" href="/">
        <h3>SmartSpace</h3>
      </a>
      <ul class="navbar-nav mr-auto">
        <li>
          <a class="dropdown-item" href="#">账号管理</a>
        </li>
        <li>
          <a @click="$_clearList()" class="dropdown-item" href="#">清空列表</a>
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
        <div class="col-5 ">
          <h6 class="text-center">账号列表</h6>
          <hr>
          <div class=" mb-2" style="overflow: scroll;overflow-x: hidden;height: 800px;">
            <table class="table table-sm table-hover text-center" style="width: 90%;margin: auto">
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
        <div class="col-7">
          <h6 class="text-center">账号参数</h6>
          <hr>
          <div class="form-group" style="width: 90%;margin: auto">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white text-danger">账号</span>
              </div>
              <input v-model.trim="id" :disabled="isBatch" type="text" class="form-control" placeholder="account">
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white text-danger">密码</span>
              </div>
              <input v-model.trim="code" :disabled="isBatch" type="text" class="form-control " placeholder="password">
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white text-danger">账号类型</span>
              </div>
              <select v-model="type" :disabled="isBatch" class="custom-select ">
                <option value="" disabled>account type</option>
                <option value="user">user</option>
              </select>
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white">电话</span>
              </div>
              <input v-model.trim="phone" :disabled="isBatch" type="tel" class="form-control " placeholder="phone">
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white">邮箱</span>
              </div>
              <input v-model.trim="email" :disabled="isBatch" type="email" class="form-control " placeholder="email">
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white text-danger">权限</span>
              </div>
              <select v-model="privilege" :disabled="isBatch" class="custom-select ">
                <option value="" disabled>privilege</option>
                <option value="user">user</option>
                <option value="tracker">tracker</option>
                <!-- <option value="admin">admin</option> -->
              </select>
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white text-danger">注册码</span>
              </div>
              <input v-model.trim="regist_code" :disabled="isBatch" type="text" class="form-control " placeholder="regist code">
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white">其他信息</span>
              </div>
              <input v-model.trim="info" :disabled="isBatch" type="text" class="form-control " placeholder="info">
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white">注册时间</span>
              </div>
              <input v-model.trim="create_time" :disabled="isBatch" type="text" class="form-control " placeholder="create time">
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
</template>

<script>
import crypto from 'crypto'
import lodashArray from 'lodash/array'
export default {
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('user')),
      isBatch: false,
      isDisabled: false,
      operateButton: {
        select: '查询',
        insert: '添加',
        update: '修改',
        delete: '删除'
      },
      batchFilename: '选择批量处理文件',
      id: '',
      code: '',
      type: '',
      phone: '',
      email: '',
      privilege: 'user',
      regist_code: '',
      info: '',
      create_time: '',
      dataList: [],
      operateInfo: '当前位置：账号管理',
      operateInfoColor: '',
      isAscend: true
    }
  },
  methods: {
    $_getBatchData(type) {
      let ret = []
      if (type == 'insert' || type == 'update') {
        this.dataList.forEach(element => {
          let tempData = {}
          if (element.id) tempData.id = element.id
          if (element.code) {
            let hash = crypto.createHmac('md5', 'SmartSpace')
            tempData.code = hash.update(element.code).digest('hex')
          }
          if (element.type) tempData.type = element.type
          if (element.phone) tempData.phone = element.phone
          if (element.email) tempData.email = element.email
          if (element.privilege) tempData.privilege = element.privilege
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
              id: [this.id]
            }
            break
          }
          default:
            break
        }
      } else {
        let tempData = {}
        if (this.id) tempData.id = this.id
        if (this.code) {
          let hash = crypto.createHmac('md5', 'SmartSpace')
          tempData.code = hash.update(this.code).digest('hex')
        }
        if (this.type) tempData.type = this.type
        if (this.phone) tempData.phone = this.phone
        if (this.email) tempData.email = this.email
        if (this.privilege) tempData.privilege = this.privilege
        if (this.regist_code) tempData.regist_code = this.regist_code
        if (this.info) tempData.info = this.info
        switch (type) {
          case 'select':
            sendData.select = {
              type: this.type,
              id: [this.id]
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
              type: this.type,
              id: [this.id]
            }
            break
          default:
            break
        }
      }
      return sendData
    },
    $_clearList() {
      this.dataList = []
      this.operateInfo = '清空列表：成功'
      this.operateInfoColor = 'text-success'
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
        if (!this.id) {
          this.operateInfo = '查询失败：请填写账号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.type) {
          this.operateInfo = '查询失败：请选择账号类型'
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
                return n.id == this.id
              })
              this.dataList = this.dataList.concat(result.data.general.message)
              if (this.isBatch) this.operateInfo = '查询成功：批量查询'
              else this.operateInfo = '查询成功：' + this.id
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
        if (!this.id) {
          this.operateInfo = '添加失败：请填写账号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.type) {
          this.operateInfo = '添加失败：请选择账号类型'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.code) {
          this.operateInfo = '添加失败：请填密码'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.regist_code) {
          this.operateInfo = '添加失败：请填注册码'
          this.operateInfoColor = 'text-danger'
          return
        }
      }
      for (let index = 0; index < this.dataList.length; index++) {
        const element = this.dataList[index]
        if (element.id == this.id) {
          this.operateInfo = '添加失败：账号已存在'
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
                this.operateInfo = '添加成功：' + this.id
              }
              this.operateInfoColor = 'text-success'
            } else if (result.data.general.message == 'idExisted') {
              this.operateInfo = '添加失败：此账号已存在'
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
        if (!this.id) {
          this.operateInfo = '修改失败：请填写账号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.type) {
          this.operateInfo = '添加失败：请选择账号类型'
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
              this.operateInfoColor = 'text-success'
              if (this.isBatch) {
                this.operateInfo = '修改成功：批量修改'
              } else {
                this.operateInfo = '修改成功：' + this.id
                for (let index = 0; index < this.dataList.length; index++) {
                  const element = this.dataList[index]
                  if (element.id == this.id) {
                    element.type = this.type
                    element.code = this.code
                    element.phone = this.phone
                    element.email = this.email
                    element.privilege = this.privilege
                    element.regist_code = this.regist_code
                    element.info = this.info
                    element.create_time = this.create_time
                    break
                  }
                }
              }
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
        if (!this.id) {
          this.operateInfo = '删除失败：请填写账号'
          this.operateInfoColor = 'text-danger'
          return
        }
        if (!this.type) {
          this.operateInfo = '添加失败：请选择账号类型'
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
                this.operateInfo = '删除成功：' + this.id
                lodashArray.remove(this.dataList, n => {
                  return n.id == this.id
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
      this.id = device.id
      if (this.isBatch) this.code = ''
      else this.code = device.code
      this.type = device.type
      this.phone = device.phone
      this.email = device.email
      this.privilege = device.privilege
      this.regist_code = device.regist_code
      this.info = device.info
      this.create_time = device.create_time
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
        this.operateInfo = '操作切换：批量操作'
        this.batchFilename = '选择批量处理文件'
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
        if (colNamesLen > 4) {
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