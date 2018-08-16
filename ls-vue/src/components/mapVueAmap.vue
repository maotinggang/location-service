<template>
  <div id="container-amap">
    <el-amap vid="amap" :zoom="zoom" :center="center" :events="events">
      <el-amap-marker v-show="isMarkAll" v-for="(item, index) in markers" :key="index" :position="item.position" :events="item.events"></el-amap-marker>
      <el-amap-info-window v-if="dataOneMap" :position="dataOneMap.position" :visible="dataOneMap.visible" :content="dataOneMap.content"></el-amap-info-window>
      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'fa217b007857dd7440cae5e566ae4194',
  plugin: ['MarkerClusterer'],
  v: '1.4.6'
})
export default {
  data() {
    let self = this
    return {
      zoom: 16,
      center: [],
      markers: [],
      windows: [],
      window: '',
      markerRefs: [],
      events: {
        init(o) {
          setTimeout(() => {
            new AMap.MarkerClusterer(o, self.markerRefs, {
              gridSize: 80,
              renderCluserMarker: self._renderCluserMarker
            })
          }, 1000)
        }
      }
    }
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
  },
  methods: {
    _renderCluserMarker(context) {
      const count = this.markers.length
      let factor = Math.pow(context.count / count, 1 / 18)
      let div = document.createElement('div')
      let Hue = 180 - factor * 180
      let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)'
      let fontColor = 'hsla(' + Hue + ',100%,20%,1)'
      let borderColor = 'hsla(' + Hue + ',100%,40%,1)'
      let shadowColor = 'hsla(' + Hue + ',100%,50%,1)'
      div.style.backgroundColor = bgColor
      let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
      div.style.width = div.style.height = size + 'px'
      div.style.border = 'solid 1px ' + borderColor
      div.style.borderRadius = size / 2 + 'px'
      div.style.boxShadow = '0 0 1px ' + shadowColor
      div.innerHTML = context.count
      div.style.lineHeight = size + 'px'
      div.style.color = fontColor
      div.style.fontSize = '14px'
      div.style.textAlign = 'center'
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
      context.marker.setContent(div)
    }
  },
  mounted() {
    let longi = 0,
      lati = 0
    let windows = [],
      markers = []
    let self = this
    for (let index = 0; index < this.dataList.length; index++) {
      const element = this.dataList[index]
      longi += element.longi
      lati += element.lati
      if (this.isMarkAll) {
        markers.push({
          position: [element.longi, element.lati],
          content: `<div style="text-align:center; background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>`,
          events: {
            click() {
              self.windows.forEach(element => {
                element.visible = false
              })
              self.window = self.windows[index]
              self.$nextTick(() => {
                self.window.visible = true
              })
            },
            init(o) {
              self.markerRefs.push(o)
            }
          }
        })
        windows.push({
          position: [element.longi, element.lati + 0.0003],
          content: `<div class="prompt"><h6>设备:${element.id}</h6>
          <h6>经度:${element.longi.toFixed(6)}</h6>
          <h6>纬度:${element.lati.toFixed(6)}</h6></div>`,
          visible: false
        })
      }
    }
    if (longi && lati)
      this.center = [longi / this.dataList.length, lati / this.dataList.length]
    else this.center = [116.29692, 40.05037]
    this.markers = markers
    this.windows = windows
  }
}
</script>

<style scoped>
#container-amap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.prompt {
  background: white;
  width: 100px;
  height: 30px;
  text-align: center;
}
</style>
