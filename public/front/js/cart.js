$(function () {
  // 功能1：一进来先渲染
  $.ajax({
    type: 'get',
    url: '/cart/queryCart',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      //如果没有登录，直接跳转到登录页去登录
      if (info.error === 400) {
        location.href = 'login.html';
        return;
      }
      //登录成功，直接渲染页面
      var htmlStr = template ('cartTpl',{list:info})
      //渲染数据到页面上
      $('.lt_main .mui-table-view').html(htmlStr);
    }
  })
})