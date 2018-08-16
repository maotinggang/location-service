<template>
  <div id="display">

    <div class=" row col pl-0 pr-0 mt-3 ml-3 bg-light border border-primary rounded">
      <div class="text-center mt-4 mb-1">
        <display-icon></display-icon>
      </div>
      <div class="row col pl-0">
        <div class="row col">
          <a @click="$_pickState('all')" href="#">
            <display-count :color='badgeColor.primary'>{{deviceCount.all}}</display-count>
          </a>
          &nbsp;
          <a @click="$_pickState('online')" href="#">
            <display-count :color='badgeColor.success'>{{deviceCount.online}}</display-count>
          </a>
          &nbsp;
          <a @click="$_pickState('offline')" href="#">
            <display-count :color='badgeColor.secondary'>{{deviceCount.offline}}</display-count>
          </a>
          &nbsp;
          <a @click="$_pickState('exception')" href="#">
            <display-count :color='badgeColor.warning'>{{deviceCount.exception}}</display-count>
          </a>
        </div>
        <div class="w-100"></div>
        <div class=" border mb-1" style="overflow: scroll;height: 496px;width: 200px; ">
          <table class="table table-sm table-hover table-borderless">
            <tbody>
              <tr v-for="(item, index) in dataList" :key="index">
                <th class="pt-0 pb-0">{{index+1}}</th>
                <td class="pt-0 pb-0">
                  <a @click="$_pickOne(item)" onclick="this.setAttribute('class','text-dark')" href="#">{{item.id}}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import displayIcon from './displayIcon'
import displayCount from './displayCount'
export default {
  data() {
    return {
      isData: false,
      badgeColor: {
        primary: 'badge-primary',
        success: 'badge-success',
        secondary: 'badge-secondary',
        warning: 'badge-warning'
      },
      deviceCount: {
        all: 0,
        online: 0,
        offline: 0,
        exception: 0
      },
      dataList: []
    }
  },
  // mounted() {
  //   let dataList = []
  //   for (let index = 0; index < 5; index++) {
  //     let dataOne = {
  //       id: index,
  //       state: 'online',
  //       type:'bus'
  //       lati: 31.21515044 + 0.0005 * index,
  //       longi: 121.5273285 + 0.0005 * index
  //     }
  //     dataList.push(dataOne)
  //   }
  //   this.dataList = dataList
  // },
  components: {
    'display-icon': displayIcon,
    'display-count': displayCount
  },
  methods: {
    $_pickState(state) {
      switch (state) {
        case 'all':
          break
        case 'online':
          break
        case 'offline':
          break
        case 'exception':
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
div {
  margin-left: 0%;
}
#list-all {
  padding: 0%;
}
#display {
  width: 260px;
}
</style>