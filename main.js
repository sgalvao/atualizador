const { app, BrowserWindow, TouchBarScrubber } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 348,
    height: 228,
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