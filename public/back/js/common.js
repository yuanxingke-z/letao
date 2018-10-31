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