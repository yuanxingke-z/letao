$(function () {
  // 功能1：一进来先渲染
  render(); //先调用一次
  function render () {
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
  }
  //功能2：点击删除按钮，删除对应id的产品
  //注册事件委托
  $('.lt_main .mui-table-view').on('click','.btn_delete',function(){
    //获取保存的id
    var id = $(this).data('id');
    // 发送ajax请求，删除后台对应的id数据
    $.ajax({
      type:'get',
      url:'/cart/deleteCart',
      data: {
        id:[id]
      },
      dataType: 'json',
      success :function (info) {
        console.log(info);
        //删除成功
        if (info.success) {
          //重新渲染购物车
          render();
        }
      }
    })    
  })
})