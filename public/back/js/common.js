
//ajax 全局事件，在第一个ajax发送请求时触发
$(document).ajaxStart(function () {
  // 开启进度条
  NProgress.start();
})

//所有的ajax请求发送完毕后触发
$(document).ajaxStop(function () {
  // 设置延时器延迟执行
  setTimeout(function () {
    // 关闭进度条
    NProgress.done();
  }, 200)
})

$(function () {
  $('.aside .nav .category').click(function () {
    //点击分类管理展开二级菜单
    $(this).next().stop().slideToggle();
  })
  // 点击返回登录菜单，弹出模态框
  $('.main .logout').click(function () {
    $('#myModal').modal('show');
  })

  // 点击模态框中退出按钮，向后台发送ajax请求，
  //删除服务器对应的session文件内容，并且返回登录页
  $('.modal .exit').click(function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        } else {
          console.log(info.success);
        }
      }
    })
  })


  //点击菜单隐藏按钮，侧边栏隐藏，内容整体坐移动
  $('.main .hideMenu').click(function () {
    $('.aside').toggleClass('hideMenu');
    $('.main').toggleClass('hideMenu');
    $('.top_bar').toggleClass('hideMenu');
  })

})