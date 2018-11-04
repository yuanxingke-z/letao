$(function () {

  // 封装成函数
  function getSearch(k) {
    var str = location.search;  //获取地址栏传过来的参数
    str = decodeURI(str);       //解码汉子编码
    str = str.slice(1);
    var arr = str.split('&');
    var obj = {};
    arr.forEach(function (v, i) {
      var key = v.split('=')[0];
      var value = v.split('=')[1];
      obj[key] = value;
    })
    return obj[k];

  }

  var key = getSearch('age');
  console.log(key);
  

})