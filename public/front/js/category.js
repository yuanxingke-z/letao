$(function () {
  // 一进来先发送ajax请求，渲染一级分类列表
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      // 将模板与数据绑定
      var htmlStr = template('left_tpl', info);
      //渲染数据到页面上
      $('.lt_category_left ul').html(htmlStr);

      //渲染一级分类对应的二级分类菜单
      render(info.rows[0].id);
    }
  })

  //点击一级分类列表获取id，根据id渲染二级分类列表 需要注册事件委托
  $('.lt_category_left ul').on('click', 'a', function () {
    //获取点击分类的id
    var id = $(this).data('id');
    //向后台发送ajax请求，渲染
    render(id);
    //同时给选中的一级分类添加current类名,排出掉其他兄弟的current类名
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  })


  // 把二级分类菜单渲染封装成一个函数
  function render(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        //将模板和对象绑定
        var htmlStr2 = template('right_tpl', info);
        //将数据渲染到页面上
        $('.lt_category_right ul').html(htmlStr2);
      }
    })
  }

})