// 入口函数
$(function () {
  // 一进来先发送ajax请求，获取数据，渲染到页面上
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // 准备数据
        console.log(info);
        // 准备模板
        // 把模板和数据绑定
        var htmlStr = template('firstTmp', info);
        //把数据渲染到页面上
        $('tbody').html(htmlStr);

        // 分页插件初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'normal',
          //为page按钮绑定点击事件
          onPageClicked: function (event, originalEvent, type, page) {
            // console.log(page);
            // 每次点击新的页码时，重新渲染页面，需要使用多次，故封装，提高代码的复用性
            currentPage = page;
            render();

          }
        })

      }
    })

  }

  //添加分类的功能
  $('.addCategory').click(function () {
    //模态框显示
    $('#addModal').modal('show');
  })

  // 添加表单校验功能
  //表单校验插件初始化
  $('#form').bootstrapValidator({
    //1、指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 2、指定校验字段
    fields: {
      // 校验名称，对应的name属性
      categoryName: {
        // 校验
        validators: {
          // 校验规则
          notEmpty: {
            message: '请输入一级分类'
          }

        }
      }
    }
  })

  //校验成功后，阻止浏览器默认的跳转提交方式，改用ajax提交
  //注册表单校验成功事件
  $('#form').on('success.form.bv', function (e) {
        e.preventDefault();  //阻止表单默认跳转提交方式
        // 改用ajax提交
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
              //添加完成后，模态框隐藏
              $('#addModal').modal('hide');
              //重置表单的校验状态和内容
              $('#form').data('bootstrapValidator').resetForm(true);
              //页面重新渲染第一页 立即看到渲染的效果
              currentPage = 1;
              render();
            }
        })
  })


})