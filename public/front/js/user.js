$(function () {
  // 进来先动态渲染页面
  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    dataType : 'json',
    succes
  })
})