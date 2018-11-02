$(function () {
  // 一进来先发送ajax请求，动态渲染商品列表和分页
  var currentPage = 1;
  var pageSize = 2;

  var picArr = [];
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
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info); //准备数据
        //准备模板
        var htmlStr2 = template('dropDownTpl', info);
        //将数据渲染到页面上
        $('.dropdown-menu').html(htmlStr2);

      }
    })
  })

  //点击分类，选中对应的分类，改变按钮文本
  //需要注册事件委托
  $('.dropdown-menu').on('click', 'a', function () {
    //获取二级分类文本
    var txt = $(this).text();
    // 设置给按钮
    $('#dropdownMenu1').text(txt);
    //获取当前二级分类的id
    var id = $(this).data('id');
    //设置给隐藏域
    $('[name="brandId"]').val(id);
    //此时要手动更改隐藏域校验状态
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
  })

  // 多文件上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      //准备数据
      var picObj = data.result;
      var picAddr = picObj.picAddr;  //获取图片路径

      //一方面把地址存到数组中(数据存储层面)
      picArr.unshift(picObj);
      //另一方面将页面中添加img元素,并且每次都添加在最前面(页面渲染方面)
      $('#img_box').prepend('<img height="100" src="' + picAddr + '"></img>');

      //判断数组的长度是否大于3
      if (picArr.length > 3) {
        //删除数组的最后一项
        picArr.pop();
        //页面上删除最后一个img标签
        $('#img_box img:last-of-type').remove();
      }

      // 判断数组的长度，若长度等于3，则手动改变隐藏域的校验状态
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
      }


    }

  })

  //添加表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3、校验字段
    fields: {
      //校验二级分类名
      brandId: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存格式要求是非零开头的数字'
          }
        }
      },
      size: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式必须是 xx-xx 的格式, 例如: 32-40'
          }
        }
      },
      oldPrice: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品价格必须是非0开头的数字'
          }
        }
      },
      price: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品价格必须是非0开头的数字'
          }
        }
      },
      picStatus: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入3张图片'
          }
        }
      }

    }

  })

  //注册表单校验完成事件
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    //拼接字符串
    var params = $('#form').serialize(); //表单序列化的字符串
    params += '&picName1=' + picArr[0].picName + '&picAddr1=' + picArr[0].picAddr
    params += '&picName2=' + picArr[1].picName + '&picAddr2=' + picArr[1].picAddr
    params += '&picName3=' + picArr[2].picName + '&picAddr3=' + picArr[2].picAddr    
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: params,
      dataType: 'json',
      success: function () {
        //关闭模态框 
        $('#addModal').modal('hide');
        //渲染当前页
        currentPage = 1 ;
        render();
        //重置表单的内容和状态
        $('#form').data('bootstrapValidator').resetForm(true);
        //手动重置二级分类下拉框的文本
        $('#dropdownMenu1').text('请选择二级分类');
        //手动清除图片
        $('#img_box img').remove();
      }
    })
  })



})