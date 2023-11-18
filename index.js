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

function readBootState(callback) {
  fs.readFile(savefile, 'utf8', function (err, data) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data.charAt(0));
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
  try {
    const bootState = await new Promise((resolve, reject) => {
      readBootState((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return bootState;
  } catch (error) {
    console.error('Error reading boot state:', error);
    return null;
  }
});

ipcMain.handle('writeBootState', (event, arg) => {
  writeBootState(arg); // your function to write boot state;
})
