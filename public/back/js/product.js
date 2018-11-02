$(function () {
  // 一进来先发送ajax请求，动态渲染商品列表和分页
  var currentPage = 1;
  var pageSize = 2;
  // 进来先调用一次
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info); //准备数据
        //准备模板
        //把模板和对象绑定
        var htmlStr = template('productTpl', info);
        //将数据渲染到页面上
        $('tbody').html(htmlStr);

        //渲染分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件
            currentPage = page;
            //页面重新渲染
            render();
          }
        })
      }
    })
  }

  //点击添加分类按钮
  $('.addCategory').click(function () {
      //模态框显示
      $('#addModal').modal('show');
      //发送ajax请求渲染二级分类列表
      $.ajax({
          type: 'get',
          url : '/category/querySecondCategoryPaging',
          data : {
            page : 1,
            pageSize : 100
          },
          dataType : 'json',
          success : function (info) {
            console.log(info); //准备数据
            //准备模板
            var htmlStr2 = template ('dropDownTpl',info);
            //将数据渲染到页面上
            $('.dropdown-menu').html(htmlStr2);            
            
          }
      })
  })

})