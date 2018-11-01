$(function () {
  // 进来就发送ajax请求然后进行渲染表格数据
  //定义全局变量当前页和每页的条数
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //准备数据
        // console.log(info);
        // 绑定模板和数据
        var htmlStr = template('tmp', info);
        // console.log(htmlStr);
        // 渲染数据到页面上
        $('.main table tbody').html(htmlStr);

        // 渲染分页到页面上
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "normal",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // 点击页码之后页面需要重新渲染当前页，所以渲染的方法需要复用
            currentPage = page;
            render();
          }
        });

      }
    })
  }

  // 点击按钮，发送ajax请求，请求后台改变更新用户状态
  //1、需要传入id 和 isDelete的值
  //2、需要获取到用户的id，将id自定义保存到td中

  //点击按钮，按钮动态生成的需要注册事件委托
  $('tbody').on('click', '.btn', function () {
    //  获取当前行的id
    currentId = $(this).parent().data('id');
    // 获取需要传递给后台的isDelete状态
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // 让模态框显示
    $('#updateModal').modal('show');
  })

  //点击确定按钮，向后台发送ajax请求，改变isDelete的属性，然后重新渲染页面
  $('.modal .submit').click(function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function () {
        //隐藏模态框
        $('#updateModal').modal('hide');
        // 重新渲染页面
        render();
      }

    })

  })

})
