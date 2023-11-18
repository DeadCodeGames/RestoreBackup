const OSLoaderBar = document.getElementById('bootosloader');
const corruptedBootLines = [
    { "text": 'Loading YX OS Files', "progress": 40.4 },
    { "text": 'File system seems corrupted. Performing critical files check', "progress": 5 },
    { "text": 'Saving changes', "progress": 80 },
    { "text": 'Rebooting...' }
];

function updateProgressBar(value) {
    OSLoaderBar.value = value;
  }

function initboot(type, loadtime) {
    setTimeout(() => {
        document.querySelector("div#bootscreen").classList.add("hasosloader");
        splitboot(type);
    }, loadtime/10);
};

function splitboot(type) {
    if (type == 0) {
        corruptedBOOT();
    }
}

function corruptedBOOT() {
    writeBootSetting(1);
    restart();
}