// 区域滚动插件初始化
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
});




; (function (window) {
  //获取地址栏传参的方法
  function getSearch(k) {
    //获地址栏传来的参数
    var str = location.search;
    //解码汉字编码
    str = decodeURI(str);
    //截取？后面的字符串
    str = str.slice(1);
    //将字符串以&拆分为数组
    var arr = str.split('&'); //["key=zhou", "age=18", "sex=nan"]
    var obj = {};  //声明一个对象接收
    //遍历数组
    arr.forEach(function (v, i) {    //"age=18"
      var key = v.split('=')[0];
      var value = v.split('=')[1];
      obj[key] = value;
    })

    return obj[k];
  }

  window.getSearch = getSearch   //将getSearch暴露出去

})(window);

