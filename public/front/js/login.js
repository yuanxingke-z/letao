$(function () {
  // 点击登录获取用户名和密码
  $('#loginBtn').click(function () {
    // 获取用户名
    var username = $('#username').val().trim();
    //获取密码
    var password = $('#password').val().trim();
    //先进行一个简单的判断
    if (username === '') {
      mui.toast('请输入用户名')
      return
    }
    if (password === '') {
      mui.toast('请输入密码')
      return
    }
    // 再发送ajax，进行页面渲染
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.error === 403) {
          mui.toast('用户名或密码错误')
        }
        if (info.success) {
          //判断是不是从购物车页面跳转过来的，需要退回去
          if (location.href.indexOf('retUrl') != -1) {
            var retUrl = location.search.replace('?retUrl=', '');
            location.href = retUrl;  //跳回去
          } else {
            //没有retUrl,是直接访问的，去个人中心
            location.href = 'user.html';
          }

        }
      }
    })
  })
})