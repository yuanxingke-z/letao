//引入bootstrap-validator插件来进行表单校验
$(function () {
  //初始化表单校验插件
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
        username : {
            validators: {
                //不能为空
                notEmpty: {
                    message:'用户名不能为空'
                },
                //长度校验
                stringLength: {
                    min:2,
                    max:6,
                    message:'用户名长度必须是2-6位'
                }
            }
        },
        //校验密码
        password: {
            validators: {
              //不能为空
              notEmpty: {
                  message:'密码不能为空'
              },
              //长度校验
              stringLength: {
                  min:6,
                  max:12,
                  message:'密码长度必须是6-12位'
              }
           }
        }
    }

  })
})