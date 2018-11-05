$(function () {
  //获取地址栏传过来的参数
  var key = getSearch('key');  //获取地址栏传入的参数
  $('.lt_search input').val(key);    //设置input的值 

  // 功能1：进入页面先渲染
  render();
  //将渲染方法封装
  function render() {
    // 先用动画把它填充
    $('.lt_main .product').html('<div class="loading"></div>');
    // 两个可选的参数, 价格price 库存num
    // (1) 根据有没有高亮的 a, 决定是否需要排序
    // (2) 根据箭头的方向(类名), 决定降序还是升序,  2降序, 1升序
    // 先判断是否排序，也就是是否有current类
    var obj = {};
    obj.proName = $('.lt_search input').val();
    obj.page = 1;
    obj.pageSize = 100;
    var $current = $('.lt_sort a.current');
    if ($current.length > 0) {
      //需要排序，需要确定是以哪种方式排序
      var sortName = $current.data('type');
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
      obj[sortName] = sortValue;
    }
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: obj,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          // 将数据和对象绑定
          var htmlStr = template('productTpl', info);
          //将数据渲染到页面上
          $('.lt_main .product').html(htmlStr);

          // 由于产品是动态生成的，所以需要初始化
        }
      })
    }, 1000)

  }

  // 功能2：点击搜索框，发送ajax请求，渲染页面
  $('.search_button').click(function () {
    //渲染页面
    render();
  })

  // 3. 排序功能
  // (1) 给有 data-type 属性的排序按钮 注册点击事件
  // (2) 原来没有 current 类, 添加上 current 类
  // (3) 如果原来有 current 类, 改变箭头方向
  // (4) 根据 高亮的 a, 和箭头方向, 进行排序

  $('.lt_sort a[data-type]').click(function () {
    //判断有没有current类
    if ($(this).hasClass('current')) {
      // 有current类，需要切换排序
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      //没有current类，添加类，排除其他人的类
      $(this).addClass('current').siblings().removeClass('current');
    }

    //重新渲染页面
    render();
  })





})