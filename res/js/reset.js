async function restart() {
    const defstate = '<head><meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-eval\' \'unsafe-inline\'; style-src \'self\' \'unsafe-eval\' \'unsafe-inline\'"><link rel="stylesheet" href="res/index.css"><script src="res/js/bios.js"></script><script src="res/js/boot.js"></script><script src="res/js/reset.js"></script></head><body style="background-color: black; width: 100%; height: 100%;"><div id="biosscreen" class="screen"><!-- BIOS Messages --></div><div id="bootscreen" class="screen"><img src="res/img/yxos.svg" id="bootoslogo"><progress id="bootosloader" value="0" max="100"></progress><string id="bootmessage"></string></div></body><script src="./renderer.js"></script><script src="./index.js"></script>';

    document.querySelector("html").innerHTML = defstate;

    setTimeout(async () => {
        var bootType = await readBootSetting();
        loadBios(bootType, true); 
    }, 1500);
}

async function reset() {
    resetLoadFile();
    window.location.reload();
}