let OSLoaderBar;
let OSLoaderString

const corruptedBootLines = [
    { "text": 'Loading YX OS', "progress": 40.4 },
    { "text": 'File system seems corrupted. Performing critical files check', "progress": 5 },
    { "text": 'Saving changes', "progress": 80 },
    { "text": 'Rebooting...' }
];

const boottypes = { "corrupted": "0", "fixfailed": "F", "normal": "1" };

function updateProgressBar(value) {
    OSLoaderBar.value = value;
  }

function initboot(type, loadtime) {
    OSLoaderBar = document.getElementById("bootosloader");
    OSLoaderString = document.getElementById("bootmessage");
    setTimeout(() => {
        document.querySelector("div#bootscreen").classList.add("hasosloader");
        splitboot(type, loadtime);
    }, loadtime/10);
};

function splitboot(type, loadtime) {
    if (type == boottypes.corrupted) {
        corruptedBOOT(loadtime);
    } else if (type == boottypes.fixfailed) {
        revertSystemChangesBOOT(loadtime)
    } else if (type == boottypes.normal) {
        normalBOOT(loadtime);
    }
}

function corruptedBOOT(loadtime) {
    let bootprogress = 0;

    setTimeout(() => { OSLoaderString.textContent = "Loading YX OS Files" }, loadtime/10)
    string1int = setInterval(() => {
        var tempprogress = Math.random() * 20.4;
        if (bootprogress == 40.4) {
            clearInterval(string1int);
            setTimeout(() => {
                writeBootSetting("F");
                OSLoaderString.innerHTML = "File system seems corrupted. Performing critical files check: <bootmessagepercentage>0%</bootmessagepercentage>";
                bootprogress = 5;
                updateProgressBar(bootprogress);
                let systemfixprogress = 0;
                string2int = setInterval(() => {
                    if (bootprogress == 80) {
                        clearInterval(string2int);
                        OSLoaderString.innerHTML = "Saving Changes: <bootmessagepercentage>0%</bootmessagepercentage>";
                        let systemfixsaveprogress = 0;
                        string3int = setInterval(() => {
                            if (bootprogress == 100) {
                                clearInterval(string3int);
                                writeBootSetting(1);
                                OSLoaderString.innerHTML = "Restarting";
                                setTimeout(() => {
                                    restart();
                                }, loadtime/10);

                            }
                            else {
                                let tempsystemfixsaveprogress = Math.random() * 15 + 5;
                                if (bootprogress + (tempsystemfixsaveprogress / 5) >= 100) {
                                    bootprogress = 100;
                                    OSLoaderString.querySelector("bootmessagepercentage").textContent = "100%";
                                } else {
                                    systemfixsaveprogress = systemfixsaveprogress + tempsystemfixsaveprogress;
                                    bootprogress = bootprogress + (tempsystemfixsaveprogress / 5);
                                    OSLoaderString.querySelector("bootmessagepercentage").textContent = parseInt(systemfixsaveprogress) + "%";
                                }
                            }
                            updateProgressBar(bootprogress);
                        }, loadtime/30)
                    }
                    else {
                        systemfixprogress = systemfixprogress + 5;
                        bootprogress = bootprogress + 3.75;
                        OSLoaderString.querySelector("bootmessagepercentage").textContent = systemfixprogress + "%";
                    };
                    updateProgressBar(bootprogress);
                }, loadtime/15);
            }, loadtime / 8);
        }
        else if (bootprogress + tempprogress >= 40.4) { bootprogress = 40.4 }
        else { bootprogress = bootprogress + tempprogress };
        updateProgressBar(bootprogress);
    }, loadtime / 10);
}

function revertSystemChangesBOOT(loadtime) {
    let bootprogress = 0;
    let tempprogress = 0;
    setTimeout(() => { OSLoaderString.innerHTML = "Reverting incomplete changes to the system: <bootmessagepercentage>0%</bootmessagepercentage>" }, loadtime / 10);
    revertInt = setInterval(async () => {
        tempprogress = Math.random() * 4.04;
        if (bootprogress == 100) {
            clearInterval(revertInt);
            writeBootSetting(await readPreviousBootSetting());
            OSLoaderString.innerHTML = "Restarting";
            setTimeout(() => {restart();}, loadtime/10);
        } else if (bootprogress + tempprogress >= 100) {
            bootprogress = 100;
        } else {
            bootprogress = bootprogress + tempprogress;
        }
        updateProgressBar(bootprogress);
        OSLoaderString.querySelector("bootmessagepercentage").textContent = parseInt(bootprogress) + "%";
    }, loadtime / 10);
}

function normalBOOT(loadtime) {
    let bootprogress = 0;
    let tempprogress = 0;
    setTimeout(() => {OSLoaderString.innerHTML = "Loading YX OS" }, loadtime / 10);
    loadOSInt = setInterval(() => {
        tempprogress = Math.random() * 4.04;
        if (bootprogress == 100) {
            clearInterval(loadOSInt);
            OSLoaderString.textContent = "";
            document.querySelector("div#bootscreen").classList.remove("hasosloader");
            setTimeout(() => {
                document.getElementById("bootscreen").style.display = "none";
            }, ((loadtime / 10) + 1000));
        } else if (bootprogress + tempprogress >= 100) {
            bootprogress = 100;
        } else {
            bootprogress = bootprogress + tempprogress;
        }
        updateProgressBar(bootprogress);
    }, 250);
}