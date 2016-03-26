import { ipcRenderer } from 'electron';
//
// Renderer

document.addEventListener("DOMContentLoaded", ()=> {
  var quitIcon = document.querySelector('.js-quit-icon')
  quitIcon.addEventListener('click', ()=> {
    if(!confirm('終了しますか？')) {
      return
    }
    ipcRenderer.send('quit')
  })
  console.log('init')
})
