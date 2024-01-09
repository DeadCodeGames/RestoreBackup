const { app, BrowserWindow, ipcMain, ipcRenderer, remote, dialog } = require('electron');
const path = require('node:path');
const fs = require('fs');
const savefile = path.join(__dirname, 'load.ini');
const defaultSave = "00XXXXXXXX0";


const createWindow = () => {
const win = new BrowserWindow({ fullscreen: true, frame: false, contextisolation: true, nodeIntegration: true, webPreferences: {preload: path.join(__dirname, 'preload.js'), nodeIntegration: true, contextIsolation: false}});
    win.loadFile('index.html');
}

function checkLoad() {
  if (!fs.existsSync(savefile)) {
    // File doesn't exist, create it with default values
      fs.writeFileSync(savefile, defaultSave);
      console.log('File created with default values.');
  };
}

app.whenReady().then(() => {
  checkLoad();
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
    try {
      const newData = data.substring(0, 0) + state + data.substring(0 + 1);
      fs.writeFile(savefile, newData, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    } catch (error) {
      console.log(error.toString().startsWith("TypeError: Cannot read properties of undefined (reading 'replace')"));
    }
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
    const newData = data.substring(0, 1) + state + data.substring(1 + 1);
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
  fs.writeFile(savefile, defaultSave, function (err) {
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
      const newDate = data.substring(0, 2) + currentDate.date.toString() + currentDate.month.toString() + currentDate.year.toString() + data.substring(10)
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

ipcMain.handle('checkLoadFile', (event, arg) => {
  checkLoad();
});


function readLockNotifMainState(callback) {
  fs.readFile(savefile, 'utf8', function (err, data) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data.charAt(10));
  });
};

ipcMain.handle('readLockNotifState', async (event, arg) => {
  try {
    const lockNotifState = await new Promise((resolve, reject) => {
      readLockNotifMainState((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return lockNotifState;
  } catch (error) {
    console.error('Error reading lockscren notification state:', error);
    return null;
  }
});

function writeLockNotifState(state) {
  fs.readFile(savefile, "utf8", function (err, data) {
    try {
      fs.writeFile(savefile, data.substring(0, 10) + state + data.substring(11), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  })
};

ipcMain.handle('writeLockNotifState', (event, arg) => {
  writeLockNotifState(arg);
});