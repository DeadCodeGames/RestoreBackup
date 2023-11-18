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