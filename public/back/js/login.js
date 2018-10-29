//引入bootstrap-validator插件来进行表单校验
$(function () {
  //1、初始化表单校验插件
  /*  校验要求:
          (1) 用户名不能为空, 长度为2-6位
           (2) 密码不能为空, 长度为6-12位 */
  $('#form').bootstrapValidator({
    //指定校验时图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',  //校验成功
      invalid: 'glyphicon glyphicon-remove',  //校验不成功
      validating: 'glyphicon glyphicon-refresh'  //校验中
    },
    //指定校验字段
    fields: {
      //校验用户名
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是2-6位'
          },

          // 用以配置ajax回调的提示
          callback: {
            message: '用户名不存在'
          }
        }
      },
      //校验密码
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },

          //用以配置ajax回调的提示
          callback: {
            message: '密码输入错误'
          }
        }
      }
    }

  })


  /*
 * 2. 登录功能
 *    表单校验插件会在表单提交时进行校验, 如果希望通过 ajax 提交
 *    可以注册表单校验成功事件, 在事件中, 阻止默认的跳转提交, 通过 ajax 进行提交
 * */
  //表单提交会跳转，需要阻止浏览器跳转提交的默认属性，进行ajax提交
  //表单校验成功后，会触发success.form.bv事件，可以用它来监听表单验证成功
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault(); //阻止浏览器的默认行为
    //使用ajax向后台提交数据
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      datatype: 'json',
      success: function (info) {
        if (info.success) {
          location.href = 'index.html'
        }
        if (info.error === 1000) {
          // alert(info.message)
          // 调用插件实例方法，更新校验状态
          //参数1：校验字段
          //参数2:校验状态
          //参数3：校验规则,常用于配置校验信息
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  })

  // 3、解决表单重置的bug
  //问题：表单重置，只是把文本重置了，正确与否的表单状态没有重置
  $('[type="reset"]').click(function () {
    $('#form').data('bootstrapValidator').resetForm(true);
  })

  //4、与后台交互后更新表单的校验状态
})