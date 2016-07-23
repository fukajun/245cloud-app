import { ipcRenderer } from 'electron';
//
// Renderer

document.addEventListener("DOMContentLoaded", ()=> {
  var quitIcon = document.querySelector('.js-quit-icon')
  var reloadIcon = document.querySelector('.js-reload-icon')
  quitIcon.addEventListener('click', ()=> {
    if(!confirm('終了しますか？')) {
      return
    }
    ipcRenderer.send('quit')
  })
  reloadIcon.addEventListener('click', ()=> {
    if(!confirm('リロードしますか？')) {
      return
    }
    ipcRenderer.send('reload')
  })
  console.log('init')
})
