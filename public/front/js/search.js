$(function () {
  // 由于进行的是本地存储操作, 约定存储的键名: search_list

  // 以下三句话, 放在控制台执行, 用于添加假数据
  //  var arr = ["耐克", "阿迪", "阿迪王", "耐克王"];
  //  var jsonStr = JSON.stringify( arr );
  //  localStorage.setItem( "search_list", jsonStr );

  /*
  * 功能分析:
  * 功能1: 搜索历史记录渲染
  * 功能2: 清空搜索历史
  * 功能3: 删除单条历史记录
  * 功能4: 添加搜索历史记录
  * */


  /*
  * 功能1: 搜索历史记录渲染
  * 思路:
  *   (1) 读取本地存储, 读取得到是 jsonStr
  *   (2) 转成数组
  *   (3) 结合模板引擎渲染
  * */

  render();  //进来先渲染一次
  //  获取本地存储，并且返回一个数组
  function getHistory() {
    //假如为null,则需要对数组进行处理，null在后面是没有意义的
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }

  //将历史记录渲染封装
  function render() {
    //先得到数组
    var arr = getHistory();
    //  将模板和对象绑定
    var htmlStr = template('history_tpl', { list: arr });
    //将数据渲染到页面上
    $('.lt_history').html(htmlStr);
  }


  /*
  * 功能2: 清空历史记录
  * 思路:
  *   (1) 给 清空全部 添加点击事件 (事件委托注册)
  *   (2) 清除本地历史的记录 removeItem
  *   (3) 页面重新渲染
  * */
  $('.lt_history').on('click', '.btn_empty', function () {
    //  出现确认框
    mui.confirm('你确定要清空历史记录吗？', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        localStorage.removeItem('search_list');  //清除历史记录
        render();  //页面重新渲染
      }
    })

  })



  /*
 * 功能3: 删除单个
 * 思路:
 *   (1) 给删除按钮, 通过事件委托注册点击事件
 *   (2) 存储下标, 点击的时候, 获取下标
 *   (3) 根据下标, 删除数组的对应项
 *   (4) 将数组存储到本地存储中
 *   (5) 页面重新渲染
 * */

  // 注册事件委托
  $('.lt_history').on('click', '.btn-delete', function () {
    //获取当前点击元素的下标
    var index = $(this).data('index');
    //获取本地存储返回一个arr数组
    var arr = getHistory();
    //删除数组的对应项
    arr.splice(index, 1);
    //将数组转为json字符串存入localStorage中
    localStorage.setItem('search_list', JSON.stringify(arr));
    // 历史记录重新渲染
    render();
  })


  /*
  * 功能4: 添加历史记录功能
  * 思路:
  *   (1) 给搜索按钮添加点击事件
  *   (2) 获取输入框的值
  *   (3) 往数组的最前面添加 (unshift)
  *   (4) 将数组存储到本地存储中
  *   (5) 页面重新渲染
  * */

  $('.search_button').click(function () {
    //获取关键字
    var key = $('.lt_search input').val().trim();
    if (key === '') {
      mui.toast('请输入搜索关键字', { duration: 'long', type: 'div' });
      return;
    }
    //获取本地存储，返回一个数组
    var arr = getHistory();
    //优化
    //判断数组是否有重复，有重复，就把之前的重复项删掉
    //获取重复项的下标
    var index = arr.indexOf(key);
    //如果有重复，就删除掉
    if (index != -1) {
      arr.splice(index, 1);
    }

    // 如果长度超过10个,就删除最后一个
    if (arr.length >= 10) {
      arr.pop();  //删除最后一项
    }
    //往数组最前面添加值
    arr.unshift(key);
    // 把数组转为json字符串后存储到本地存储中
    localStorage.setItem('search_list', JSON.stringify(arr));
    //页面重新渲染
    render();
    //清空输入框的值
    $('.lt_search input').val('');
    //跳转到搜索分类页，并且把值从一个页面传入到另一个页面
    location.href = 'searchList.html?key=' + key;

  })


})  
