import { ipcRenderer, shell } from 'electron';

// NOTE: webviewを使用している時にcookiesを使用するとcookieが有効でないという問題が発生する
//import { _cookies } from 'electron-cookies';
// NOTE: 通常のjQueryが正しく読み込めないためアプリ内のjqueryを使用している
//     : <webview>を使用するようになったため次のjquery, calheadMapは不要になった
//window.$ = window.jQuery = require('jquery');
//window.CalHeatMap = function() {
//  return { init : function() { } }
//}

document.addEventListener("DOMContentLoaded", ()=> {

  $(document).on('click', 'a[href^="http"]', function(e) {
    event.preventDefault();
    shell.openExternal(this.href);
  })

  var getCountdown = function() {
    var countdown = document.title;
    if(!countdown.match(/\d\d:\d\d/)) {
      return ''
    }
    return countdown
  }

  ipcRenderer.on('pomo_start', ()=> {
    $('.btn:eq(1)').click()
  })

  setInterval(() => {
    //ipcRenderer.send('start')
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

  // Send Init
  ipcRenderer.send('renderer_init')
})
