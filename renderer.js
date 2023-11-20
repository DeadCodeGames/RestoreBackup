function writeBootSetting(state) {
    ipcRenderer.invoke('writeBootState', state);
}

async function readBootSetting() {
    try {
      const bootState = await ipcRenderer.invoke('readBootState');
      return bootState;
    } catch (error) {
      console.error('Error reading boot state from renderer:', error);
      return null;
    }
}
  

function writePreviousBootSetting(state) {
  ipcRenderer.invoke('writePreviousBootState', state);
}

async function readPreviousBootSetting() {
  try {
    const bootState = await ipcRenderer.invoke('readPreviousBootState');
    return bootState;
  } catch (error) {
    console.error('Error reading previous boot state from renderer:', error);
    return null;
  }
}