async function restart() {
    const defstate = '<head><meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\'"><link rel="stylesheet" href="res/index.css"><script src="res/js/bios.js"></script><script src="res/js/boot.js"></script><script src="res/js/reset.js"></script></head><body><div id="biosscreen" class="screen"><!-- BIOS Messages --></div><div id="bootscreen" class="screen"><img src="res/img/yxos.svg" id="bootoslogo"><progress id="bootosloader" value="0" max="100"></progress><bootmessage></bootmessage></div></body><script src="./renderer.js"></script><script src="./index.js"></script>';

    document.querySelector("html").innerHTML = defstate;

    var bootType = await readBootSetting();
    loadBios(bootType); 
}