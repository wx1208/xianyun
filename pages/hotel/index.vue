<template>
    <div>
      <h3>高德地图</h3>
      <div id="container"></div>
    </div>
</template>

<script>
export default {
  // 574d7ff83aafc901e76827057406372d
mounted(){
   window.onLoad = function () { 
     var map = new AMap.Map('container'); 
     console.log(map.getCenter(), '132')
     map.on('click', function (e) {
       console.log(e)
       console.log(map.getCenter())
       map.setCenter(e.lnglat)
     })
     } 
   var url = 'https://webapi.amap.com/maps?v=1.4.15&key=574d7ff83aafc901e76827057406372d&callback=onLoad'; 
   var jsapi = document.createElement('script'); 
   jsapi.charset = 'utf-8'; jsapi.src = url; document.head.appendChild(jsapi);
}
 
}
</script>

<style lang="less" scoped>
#container {width:500px; height: 500px; }

</style>