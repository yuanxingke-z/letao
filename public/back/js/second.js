// 入口函数
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  //一进入页面先发送ajax请求，动态渲染表格数据
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //准备数据
        // console.log(info);
        //准备模板
        //将模板和对象绑定
        var htmlStr = template('secondTmp', info);
        // console.log(htmlStr);
        // 把数据渲染到页面上
        $('tbody').html(htmlStr);

        //添加分页功能
        // 分页插件初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'large',
          // 为按钮绑定点击事件
          onPageClicked: function (event, originalEvent, type, page) {
            // 点击按钮切换页面，重新渲染当前页面
            currentPage = page;
            render();
          }
        })

      }
    })
  }

  //点击添加分类按钮，显示模态框
  $('.addCategory').click(function () {
    $('#addModal').modal('show');
    //并且发送ajax请求，动态渲染一级分类目录 (为了提升体验，先渲染出来，到时候下拉直接显示)
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        //准备数据
        console.log(info);
        //准备模板
        //将模板跟对象绑定
        var htmlStr2 = template('dropDown', info)
        // console.log(htmlStr2);
        //将数据渲染到页面中
        $('.dropdown-menu').html(htmlStr2);

        // 给一级分类按钮注册事件委托，因为下拉的分类都是动态生成的
        $('.dropdown-menu').on('click', 'a', function () {
          var txt = $(this).text();
          $('#dropdownMenu1').text(txt);  //将按钮文本设置为选中类
          var id = $(this).data('id');
          $('[name="categoryId"]').val(id);  //将id赋值给输入框，传递给后台
        })


      }
    })
  })


})