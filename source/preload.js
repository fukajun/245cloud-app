import { ipcRenderer } from 'electron';

// NOTE: 通常のjQueryが正しく読み込めないためアプリ内のjqueryを使用している
window.$ = window.jQuery = require('jquery');

// FIXME: CalHeatMap()が存在しないエラーへの対応するためのMock
window.CalHeatMap = function() {
  return { init : function() { } }
}

$(()=> {
  var getCountdown = function() {
    return $('.countdown2').text().trim();
  }

  setInterval(() => {
    let countdown= getCountdown()
    if(!countdown.length) { return }

    ipcRenderer.send('set_title', countdown)
  }, 100)

  setInterval(() => {
    let countdown= getCountdown()
    if(!countdown.length) { return }

    switch(countdown) {
      case '23:55':
        ipcRenderer.send('notify', '245cloud' , 'Pomo START!!!')
        break
      case '00:00':
        ipcRenderer.send('notify', '245cloud' , 'お疲れ様でした')
        break
    }
  }, 800)
})
