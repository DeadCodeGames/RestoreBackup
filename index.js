const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({ fullscreen: true, frame: false, });
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
  })