$(function () {
  // 一进来先渲染
  $.ajax({
    type: 'get',
    url: '/cart/queryCart',
    dataType: 'json',
    success: function () {
      
    }
  })
})