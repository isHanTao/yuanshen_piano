$(function () {
  var luck = {}
  document.body.addEventListener('keypress',function (e) {
    if (luck[e.code] === undefined){
      $('#' + e.code).addClass('active')
      luck[e.code] = 1
      console.log(1)
    }
  })
  document.body.addEventListener('keyup',function (e) {
    luck[e.code] = undefined
    setTimeout(function () {
      $('#' + e.code).removeClass('active')
    },700)
  })
  $('#showWord').click(function () {
    var attr = $(this).attr('ishow')
    if (attr==='true'){
      $('.word').addClass('show_active')
      $(this).attr('ishow','false')
      $(this).html('不显示字母')
    }else {
      $('.word').removeClass('show_active')
      $(this).attr('ishow','true')
      $(this).html('显示字母')
    }
  })

  $('#showMusic').click(function () {
    var attr = $(this).attr('ishow')
    if (attr==='true'){
      $('.music').addClass('show_active')
      $(this).attr('ishow','false')
      $(this).html('不显示音阶')
    }else {
      $('.music').removeClass('show_active')
      $(this).attr('ishow','true')
      $(this).html('显示音阶')
    }
  })
  $('#showDo').click(function () {
    var attr = $(this).attr('ishow')
    if (attr==='true'){
      $('.do').addClass('show_active')
      $(this).attr('ishow','false')
      $(this).html('不显示Do')
    }else {
      $('.do').removeClass('show_active')
      $(this).attr('ishow','true')
      $(this).html('显示Do')
    }
  })
})

