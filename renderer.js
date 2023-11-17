function writeBootSetting(state) {
    ipcRenderer.invoke('writeBootState', state);
}

function readBootSetting() {
    return ipcRenderer.invoke('readBootState');
}