<template>
  <div id="container">

  </div>
</template>

<script>
export default {
  data() {
    return {}
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
  mounted() {
    let self = this
    window.onLoad = function() {
      var map = new AMap.Map('container', {
        zoom: 12,
        resizeEnable: true
      })
      //add plugins
      AMap.plugin(['AMap.Scale'], function() {
        map.addControl(
          new AMap.Scale({
            position: 'RB'
          })
        )
      })
      //add markers
      var markers = []
      if (self.isMarkAll) {
        self.dataList.forEach(element => {
          var marker = new AMap.Marker({
            position: [element.longi, element.lati],
            title: element.type
          })
          //add marker click event
          var infoWindow = new AMap.InfoWindow({
            content: `<div class="prompt"><h6>设备:${element.id}</h6>
                        <h6>经度:${element.longi.toFixed(6)}</h6>
                        <h6>纬度:${element.lati.toFixed(6)}</h6></div>`,
            offset: new AMap.Pixel(5, -20)
          })
          marker.on('click', function(e) {
            infoWindow.open(map, e.target.getPosition())
          })
          markers.push(marker)
        })
      }
      map.add(markers)
      map.setFitView()
      //markers cluster
      map.plugin(['AMap.MarkerClusterer'], function() {
        cluster = new AMap.MarkerClusterer(map, markers)
      })
    }
    var jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src =
      'https://webapi.amap.com/maps?v=1.4.8&key=fa217b007857dd7440cae5e566ae4194&callback=onLoad'
    document.head.appendChild(jsapi)
  }
}
</script>

<style scoped>
#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>