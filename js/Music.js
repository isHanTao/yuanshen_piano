class Music {
    luck = {} // 按键锁
    keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U',
        'A', 'S', 'D', 'F', 'G', 'H', 'J',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M'
    ] //监听键盘按键列表
    time = 300 //一拍的时间
    base = 4
    long = 4
    timeMap = null
    timer = null
    select = '.map'
    play_node = 0
    map = []
    playMain = false

    constructor(map) {
        this.map = map
    }

    init() {
        this.registerEvent()
        this.noteToTime()
        this.renderMap()
    }

    // 注册监听事件
    registerEvent() {
        let that = this
        document.body.addEventListener('keydown', (e) => {
            if (this.luck[e.code] === undefined) {
                this.luck[e.code] = 1
                if (this.keys.indexOf(e.key.toUpperCase()) !== -1) {
                    e.preventDefault()
                    if (e.altKey){
                        $('#A' + e.key.toUpperCase()).addClass('active')
                        this.playAudios('A' + e.key.toUpperCase())
                    }else if (e.shiftKey){
                        $('#S' + e.key.toUpperCase()).addClass('active')
                        this.playAudios('S' + e.key.toUpperCase())
                    }else {
                        $('#' + e.key.toUpperCase()).addClass('active')
                        this.playAudios(e.key.toUpperCase())
                    }
                }
            }
        })
        document.body.addEventListener('keyup', (e) => {
            this.luck[e.code] = undefined
            $('#' + e.key.toUpperCase()).removeClass('active')
            $('#A' + e.key.toUpperCase()).removeClass('active')
            $('#S' + e.key.toUpperCase()).removeClass('active')
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
        $('#play').click(function() {
            var attr = $(this).attr('ishow')
            if (attr === 'true') {
                that.stopMusic()
                $(this).attr('ishow', 'false')
                $(this).html('播放')
            } else {
                that.playMusic()
                $(this).attr('ishow', 'true')
                $(this).html('暂停')
            }
        })
        $('#replay').click(() => {
            this.replayMusic()
        })
        $('#onlyMain').click(function() {
            var attr = $(this).attr('ishow')
            if (attr === 'true') {
                that.renderMap()
                $(this).attr('ishow', 'false')
                $(this).html('显示所有旋律')
            } else {
                that.renderMapSimper()
                $(this).attr('ishow', 'true')
                $(this).html('只显示主旋律')
            }
        })
        $('#playMain').click(function() {
            var attr = $(this).attr('ishow')
            if (attr === 'true') {
                that.playMain = true
                $(this).attr('ishow', 'false')
                $(this).html('播放所有旋律')
            } else {
                that.playMain = false
                $(this).attr('ishow', 'true')
                $(this).html('只播放主旋律')
            }
        })
    }

    // 将音节转化成所在拍点点
    noteToTime() {
        var out = [[{key: '0', time: 0}, this.map[0][0]], [{key: '0', time: 4}, this.map[1][0]]]
        for (let i = 2; i < this.map[0].length; i++) {
            out[0].push({key: this.map[0][i].key, time: out[0][i - 1].time + this.map[0][i - 1].time})
        }
        for (let i = 2; i < this.map[1].length; i++) {
            out[1].push({key: this.map[1][i].key, time: out[1][i - 1].time + this.map[1][i - 1].time})
        }
        this.timeMap = out
    }


    // 播放单音节
    playAudios(key) {
        // new Audio('./mp3/' + key + '.mp3').play()
        new Audio(MIDI.get(key)).play()
    }

    // 渲染音谱
    renderMap() {
        $(this.select).empty()
        let countM = 0
        let countO = 0
        let indexM = 0
        let indexO = 0
        let html = ''
        let main = ''
        let other = ''
        let long = this.base * this.long
        while (true){
            while (indexM < this.map[0].length && countM < long) {
                main += `<div id="note${this.timeMap[0][indexM].time}">${wTom[this.map[0][indexM].key.toUpperCase()]} <p>${this.map[0][indexM].time}</p></div>`
                countM += this.map[0][indexM].time
                indexM++
            }
            while (indexO < this.map[1].length && countO < long) {
                other += `<div>${wTom[this.map[1][indexO].key.toUpperCase()]} <p>${this.map[1][indexO].time}</p></div>`
                countO += this.map[1][indexO].time
                indexO++
            }
            html  = `<div class="map-item">
                        <div class="map-main">${main}</div>
                        <div class="map-other">${other}</div>
                    </div>`
            $(this.select).append(html)
            html = ''
            main = ''
            other = ''
            countO = 0
            countM = 0
            if (indexM >= this.map[0].length-1 && indexO >= this.map[1].length-1){
                break
            }
        }
    }

    renderMapSimper(){
        $(this.select).empty()
        let countM = 0
        let indexM = 0
        let html = ''
        let main = ''
        let long = this.base * this.long
        while (true){
            while (indexM < this.map[0].length && countM < long) {
                main += `<div id="note${this.timeMap[0][indexM].time}">${wTom[this.map[0][indexM].key]} <p>${this.map[0][indexM].time}</p></div>`
                countM += this.map[0][indexM].time
                indexM++
            }
            html  = `<div class="map-item">
                        <div class="map-main">${main}</div>
                    </div>`
            $(this.select).append(html)
            html = ''
            main = ''
            countM = 0
            if (indexM >= this.map[0].length-1){
                break
            }
        }
    }

    // 根据音谱重新播放音乐
    replayMusic() {
        if (this.timer) {
            clearInterval(this.timer)
            this.play_node = 0
        }
        this.timer = setInterval(()=>{
            this.autoPlay()
        }, this.time / 2)    }

    // 停止播放
    stopMusic() {
        clearInterval(this.timer)
    }

    // 从指定位置播放
    playMusic(at = null) {
        if (at !== null) {
            this.play_node = at
        }
        this.timer = setInterval(()=>{
            this.autoPlay()
        }, this.time / 2)

    }

    // 获取当前播放位置
    getPlay() {
        if (this.play_node >= this.timeMap[0][this.timeMap[0].length - 1].time) {
            return ['end']
        }
        const data1 = this.timeMap[0].find((val) => {
            return this.play_node === val.time
        })
        const data2 = this.timeMap[1].find((val) => {
            return this.play_node === val.time
        })
        return [data1 ? data1.key.toUpperCase() : '0', data2 ? data2.key.toUpperCase() : '0']
    }

    autoPlay() {
        let data = this.getPlay()
        if (data[0] === 'end') {
            clearInterval(this.timer)
            this.play_node = 0
            $('#play').attr('ishow','false')
            $('#play').html('播放')
        } else {
            $('.map-main > div').removeClass('play')
            $('#note' + this.play_node).addClass('play')
            this.play_node++
            if (data[0] !== '0') {
                this.playAudios(data[0])
                $('#' + data[0]).addClass('active')
                setTimeout(function () {
                    $('#' + data[0]).removeClass('active')
                }, this.time / 2)
            }
            if (!this.playMain && data[1] !== '0' ) {
                this.playAudios(data[1])
                $('#' + data[1]).addClass('active')
                setTimeout(function () {
                    $('#' + data[1]).removeClass('active')
                }, this.time / 2)
            }
        }
    }
}
