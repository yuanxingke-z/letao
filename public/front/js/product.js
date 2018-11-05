$(function () {
  //获取搜索页传过来的商品id
  var productId = getSearch('productId');
  // 发送ajax请求
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      // 将模板跟对象绑定
      var htmlStr = template('detailTpl', info);
      //将数据渲染到页面上
      $('.lt_main .mui-scroll').html(htmlStr);

      //由于图片轮播必须在页面加载完毕后，动态生成的轮播需要手动初始化
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      //数字输入框初始化
      mui('.mui-numbox').numbox()

    }

  })

})