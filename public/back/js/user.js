// 进来就发送ajax请求然后进行渲染表格数据
//定义全局变量当前页和每页的条数
var currentPage = 1;
var pageSize = 5;
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
      console.log(info);
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