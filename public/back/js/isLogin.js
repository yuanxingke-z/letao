// 每次访问页面时，先询问后台是否已经登陆过，若没有登录就返回登录页
$.ajax({
  type: 'get',
  url: '/employee/checkRootLogin',
  dataType: 'json',
  success: function (info) {
    if (info.error === 400) {
      location.href = 'login.html';
    } else {
      console.log(info);
    }
  }
})