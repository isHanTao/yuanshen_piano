$(function () {
  var luck = {}
  var art_C = {
    'KeyQ': 'C4',
    'KeyW': 'D4',
    'KeyE': 'E4',
    'KeyR': 'F4',
    'KeyT': 'G4',
    'KeyY': 'A4',
    'KeyU': 'B4',

    'KeyA': 'C3',
    'KeyS': 'D3',
    'KeyD': 'E3',
    'KeyF': 'F3',
    'KeyG': 'G3',
    'KeyH': 'A3',
    'KeyJ': 'B3',

    'KeyZ': 'C2',
    'KeyX': 'D2',
    'KeyC': 'E2',
    'KeyV': 'F2',
    'KeyB': 'G2',
    'KeyN': 'A2',
    'KeyM': 'B2',
  }
  document.body.addEventListener('keydown', function (e) {
    if (luck[e.code] === undefined) {
      $('#' + e.code).addClass('active')
      luck[e.code] = 1
      playAudios(art_C[e.code])
    }
  })
  document.body.addEventListener('keyup', function (e) {
    luck[e.code] = undefined
    $('#' + e.code).removeClass('active')
  })
  $('#showWord').click(function () {
    var attr = $(this).attr('ishow')
    if (attr === 'true') {
      $('.word').addClass('show_active')
      $(this).attr('ishow', 'false')
      $(this).html('不显示字母')
    } else {
      $('.word').removeClass('show_active')
      $(this).attr('ishow', 'true')
      $(this).html('显示字母')
    }
  })

  $('#showMusic').click(function () {
    var attr = $(this).attr('ishow')
    if (attr === 'true') {
      $('.music').addClass('show_active')
      $(this).attr('ishow', 'false')
      $(this).html('不显示音阶')
    } else {
      $('.music').removeClass('show_active')
      $(this).attr('ishow', 'true')
      $(this).html('显示音阶')
    }
  })
  $('#showDo').click(function () {
    var attr = $(this).attr('ishow')
    if (attr === 'true') {
      $('.do').addClass('show_active')
      $(this).attr('ishow', 'false')
      $(this).html('不显示Do')
    } else {
      $('.do').removeClass('show_active')
      $(this).attr('ishow', 'true')
      $(this).html('显示Do')
    }
  })
  $('#play').click(function () {
    playMusic()
  })
  var audios = {}
  Object.keys(MIDI.Sound).forEach(function (key) {
    audios[key] = new Audio(MIDI.Sound[key])
  })

  function playAudios(key, time = 0) {
    if (time !== 0) {
      setTimeout(function () {
        console.log(1)
        new Audio(MIDI.Sound[key]).play()
        $('#')
      }, time)
    } else {
      new Audio(MIDI.Sound[key]).play()
    }
  }

  var time = 500 / 4
  art_sky = [[
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'KeyH', time: 4},
      {key: 'KeyJ', time: 4},
      {key: 'KeyQ', time: 4},
      {key: 'KeyJ', time: 6},

      {key: 'KeyQ', time: 4},
      {key: 'KeyE', time: 4},
      {key: 'KeyJ', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'KeyD', time: 4},
      {key: 'KeyH', time: 4},
      {key: 'KeyG', time: 6},
      {key: 'KeyH', time: 4},
      {key: 'KeyQ', time: 4},
      {key: 'KeyG', time: 4},

      {key: 'no', time: 4},
      {key: 'no', time: 4},

      {key: 'KeyF', time: 4},
      {key: 'KeyD', time: 4},
      {key: 'KeyF', time: 4},
      {key: 'KeyD', time: 6},
      {key: 'KeyF', time: 4},
      {key: 'KeyQ', time: 4},
      {key: 'KeyD', time: 4}
    ],
    [
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'KeyN', time: 4},
      {key: 'KeyA', time: 4},
      {key: 'KeyD', time: 4},
      {key: 'KeyA', time: 4},
      {key: 'KeyC', time: 4},
      {key: 'KeyV', time: 4},
      {key: 'KeyM', time: 4},

      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
      {key: 'no', time: 4},
    ]

  ]
  for (let i = 1; i < art_sky[0].length; i++) {
    art_sky[0][i].time += art_sky[0][i - 1].time
    art_sky[1][i].time += art_sky[1][i - 1].time
  }
  console.log(art_sky)

  function playMusic() {
    for (let i = 0; i < art_sky[0].length; i++) {
      console.log(time * art_sky[0][i].time)
      if (art_sky[0].key !== 'no') {
        playAudios(art_C[art_sky[0][i].key], time * art_sky[0][i].time)
        playAudios(art_C[art_sky[1][i].key], time * art_sky[1][i].time)
      }
    }
  }
})

