<template>
  <div>
    <a-map v-if="'amap'==(userConfigure? userConfigure.map:'')" :dataList="dataList" :dataOneMap="dataOneMap" :isMarkAll="isMarkAll"></a-map>
    <user-map v-else :dataList="dataList" :dataOneMap="dataOneMap" :isMarkAll="isMarkAll"></user-map>
  </div>
</template>

<script>
import mapAmap from './mapAmap'
// import mapAmap from './mapVueAmap'
import mapUser from './mapUser'
export default {
  data() {
    return {
      userConfigure: JSON.parse(localStorage.getItem('configure'))
    }
  },
  components: {
    'a-map': mapAmap,
    'user-map': mapUser
  },
  props: {
    dataList: {
      type: Array
    },
    dataOneMap: {
      type: Object
    },
    isMarkAll: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
</style>