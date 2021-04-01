$(function () {
  var luck = {}
  document.body.addEventListener('keypress',function (e) {
    if (luck[e.code] === undefined){
      $('#' + e.code).addClass('active')
      luck[e.code] = 1
    }
  })
  document.body.addEventListener('keyup',function (e) {
    luck[e.code] = undefined
    $('#' + e.code).removeClass('active')
    playAudios('A0')
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
  var audios = {}
  Object.keys(MIDI.Sound).forEach(function(key){
    audios[key] = new Audio(MIDI.Sound[key])
  })
  function playAudios(key) {
    audios[key].play()
  }
})

