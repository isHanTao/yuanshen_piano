$(function () {
  document.body.addEventListener('keydown',function (e) {
    $('#' + e.code).addClass('active')
  })
  document.body.addEventListener('keyup',function (e) {
    $('#' + e.code).removeClass('active')
  })
})

