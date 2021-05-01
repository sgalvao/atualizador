const { app, BrowserWindow, Tray} = require('electron')
const path = require('path')
const api = require('./src/services/update')

function createWindow () {
  const iconApp = new Tray(__dirname + '/public/assets/img/icon.png')
  const win = new BrowserWindow({
    width: 348,
    height: 228,
    icon:__dirname+'/public/assets/img/icon.png',
    frame:false,
    resizable:false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true
    }
    
  })

  win.loadFile('./public/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
 

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

