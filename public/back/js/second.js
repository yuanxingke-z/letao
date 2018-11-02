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

      }
    })
  })

  // 给一级分类按钮注册事件委托，因为下拉的分类都是动态生成的
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#dropdownMenu1').text(txt);  //将按钮文本设置为选中类
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);  //将id赋值给输入框，传递给后台
    //手动改变表单的校验状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  })

  // 文件上传插件初始化
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var url = data.result['picAddr'];
      $('#img_box img').attr('src', url);
      $('[name="brandLogo"]').val(url);
      //手动改变文件上传表单的校验状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  });

  // 表单校验
  //表单初始化
  $('#form').bootstrapValidator({
    //指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [], //隐藏的也校验
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      // 校验id
      categoryId: {
        // 校验规则
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        // 校验规则
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        // 校验规则
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }

    }
  })

  // 注册表单校验完成时间，阻止浏览器默认方式跳转提交，转为ajax提交
  $('#form').on('success.form.bv', function (e) {
        e.preventDefault();  //阻止默认行为
        // 调用ajax请求后台提交
        $.ajax({
            type: 'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            dataType: 'json',
            success: function(info) {
                // console.log(info);
                //关闭模态框
                $('#addModal').modal('hide');
                //重置表单内容和状态
                $('#form').data('bootstrapValidator').resetForm(true);
                //手动重置按钮文本和图片内容
                $('#dropdownMenu1').text('请选择一级分类');   //重置按钮文本
                $('#img_box img').attr('src', '../images/none.png');      //重置图片路径
                //渲染当前页面
                currentPage = 1;
                render(); 
            }
        })
  })

})