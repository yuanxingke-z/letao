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

  //点击尺码让尺码成选中状态  给span类名  注册事件委托
  $('.lt_main .mui-scroll').on('click', '.lt_size span', function () {
    $(this).addClass('current').siblings().removeClass('current');
  })

  // 点击购物车，跳转到购物车页面
  $('#addCart').click(function () {
    var num = $('.mui-numbox-input').val();
    var size = $('.lt_size span.current').text();
    // 如果没有选择尺码，弹出消息提示框
    if (!size) {
      // 没有选中尺码
      mui.toast('请选择尺码', { duration: 'long', type: 'div' });
      return;
    }

    // 点击去购物车，向后台发送ajax请求，添加商品
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        num: num,
        size: size
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.error === 400) {
          location.href = 'login.html?retUrl=' + location.href;
        }
        if (info.success) {
          mui.confirm('添加成功', '温馨提示', ['去购物车', '继续浏览'], function (e) {
            if (e.index === 0) {
              location.href = 'cart.html';
            }
          })
        }

      }

    })
  })
})



