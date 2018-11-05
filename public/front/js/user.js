$(function () {
  // 功能1：进来先动态渲染页面
  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      //若果没有登录，直接跳到登录页
      if (info.error === 400) {
        location.href = 'login.html';
        return;
      }
      // 将模板跟对象绑定
      var htmlStr = template('userTpl', info);
      //将数据渲染到页面上
      $('#userInfo').html(htmlStr);
    }
  })

  //功能2：点击退出按钮，发送ajax请求，清除登录状态，回到登录页
  $('#logout').click(function () {
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          location.href = 'login.html'; //跳转到登录页
        }

      }
    })
  })
})