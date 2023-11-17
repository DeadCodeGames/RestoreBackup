const { app, BrowserWindow, ipcMain, ipcRenderer, remote, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');
const savefile = path.join(__dirname, 'load');


const createWindow = () => {
const win = new BrowserWindow({ fullscreen: true, frame: false, contextisolation: true, nodeIntegration: true, webPreferences: {preload: path.join(__dirname, 'preload.js'), nodeIntegration: true, contextIsolation: false}});
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    })
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()
})

function readBootState() {
  fs.readFile(savefile, 'utf8', function (err, data) {
    return data.charAt(0);
  });
}

function writeBootState(state) {
  fs.readFile(savefile, "utf8", function (err, data) {
    const newData = data.replace(data.charAt(0), state)
    fs.writeFile(savefile, newData, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was updated!");
    });
  })
}

ipcMain.handle('readBootState', async (event, arg) => {
  const result = await readBootState(); // your function to read boot state
  return await result;
})

ipcMain.handle('writeBootState', (event, arg) => {
  writeBootState(arg); // your function to write boot state;
})
