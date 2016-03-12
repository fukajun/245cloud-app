import { ipcRenderer } from 'electron';
import { _cookies } from 'electron-cookies';

// NOTE: 通常のjQueryが正しく読み込めないためアプリ内のjqueryを使用している
window.$ = window.jQuery = require('jquery');

// FIXME: CalHeatMap()が存在しないエラーへの対応するためのMock
window.CalHeatMap = function() {
  return { init : function() { } }
}

$(()=> {
  var getCountdown = function() {
    var webview = document.getElementById('webview');
    var countdown =  webview.getTitle();
    if(!countdown.match(/\d\d:\d\d/)) {
      return ''
    }
    return countdown
  }

  setInterval(() => {
    let countdown= getCountdown()
    if(!countdown.length) {
      return
    }
    ipcRenderer.send('set_title', countdown)
  }, 100)

  setInterval(() => {
    let countdown= getCountdown()
    if(!countdown.length) { 
      return
    }

    switch(countdown) {
      case '23:55':
        ipcRenderer.send('notify', '245cloud' , 'Pomo START!!!')
        break
      case '20:00':
        ipcRenderer.send('notify', '245cloud' , 'あと20分!')
        break
      case '10:00':
        ipcRenderer.send('notify', '245cloud' , 'あと10分!!')
        break
      case '05:00':
        ipcRenderer.send('notify', '245cloud' , 'あと5分!!!')
        break
      case '00:00':
        ipcRenderer.send('notify', '245cloud' , 'お疲れ様でした')
        break
    }
  }, 800)
})
