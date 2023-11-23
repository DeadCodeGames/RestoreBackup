const { app, BrowserWindow, ipcMain, ipcRenderer, remote, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');
const savefile = path.join(__dirname, 'load.ini');


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
  writeBootState(arg);
})


function readPreviousBootState(callback) {
  fs.readFile(savefile, 'utf8', function (err, data) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data.charAt(1));
  });
}
function writePreviousBootState(state) {
  fs.readFile(savefile, "utf8", function (err, data) {
    const newData = data.replace(data.charAt(1), state)
    fs.writeFile(savefile, newData, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })
}


ipcMain.handle('readPreviousBootState', async (event, arg) => {
  try {
    const bootState = await new Promise((resolve, reject) => {
      readPreviousBootState((err, data) => {
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

ipcMain.handle('writePreviousBootState', (event, arg) => {
  writePreviousBootState(arg);
})

ipcMain.handle('resetLoadFile', (event, arg) => {
  fs.writeFile(savefile, "00XXXXXXXX", function (err) {
    if (err) {
      return console.log(err);
    }
  }
  )
});

function readBaseDate(callback) {
  fs.readFile(savefile, 'utf8', function (err, data) {
    if (err) {
      callback(err, null);
      return;
    } else if (data.charAt(2) == "X" || data.charAt(3) == "X" || data.charAt(4) == "X" || data.charAt(5) == "X" || data.charAt(6) == "X" || data.charAt(7) == "X" || data.charAt(8) == "X" || data.charAt(9) == "X") {
      var currentDate = {
        "base": (new Date())
      };
      currentDate["date"] = currentDate.base.getDate().toString().padStart(2, '0');
      currentDate["month"] = (currentDate.base.getMonth() + 1).toString().padStart(2, '0');
      currentDate["year"] = currentDate.base.getFullYear().toString().padStart(4, '0');
      const newDate = data.replace(data.charAt(2), currentDate.date.charAt(0)).replace(data.charAt(3), currentDate.date.charAt(1)).replace(data.charAt(4), currentDate.month.charAt(0)).replace(data.charAt(5), currentDate.month.charAt(1)).replace(data.charAt(6), currentDate.year.charAt(0)).replace(data.charAt(7), currentDate.year.charAt(1)).replace(data.charAt(8), currentDate.year.charAt(2)).replace(data.charAt(9), currentDate.year.charAt(3))
      fs.writeFile(savefile, newDate, function (err) {
        if (err) { 
          return console.log(err);
        }
      });
      var PassDate = currentDate.year + "-" + currentDate.month + "-" + currentDate.date;
    } else {
      var PassDate = (data.substring(6, 10) + "-" + data.substring(4, 6) + "-" + data.substring(2, 4))
    }
    callback(null, PassDate);
  });
}

ipcMain.handle('readBaseDate', async (event, arg) => {
  try {
    const baseDate = await new Promise((resolve, reject) => {
      readBaseDate((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return baseDate;
  } catch (error) {
    console.error('Error reading base Date: ', error);
    return null;
  }
});