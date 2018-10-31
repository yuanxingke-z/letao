// 进来就发送ajax请求然后进行渲染页面
$.ajax({
  type: 'get',
  url: '/user/queryUser',
  data:{
    page:1,
    pageSize:5
  },
  dataType: 'json',
  success: function (info) {
    //准备数据
    console.log(info);
    // 绑定模板和数据
    var htmlStr = template('tmp',info);
    // console.log(htmlStr);
    // 渲染数据到页面上
    $('.main table tbody').html(htmlStr);
    
  }
})