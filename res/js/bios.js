const biosLines = [
    "Booting up the virtual environment [X] (2 - 3.5)",
    "Initializing virtual hardware components [X] (0.5 - 1.333)",
    "Loading BIOS [X] (0.1 - 0.25)",
    "BIOS version 4.04.2.0 detected",
    "Allocating RAM [X] (0.75 - 2.5)",
    "RAM allocation complete",
    "Checking for peripheral devices [X] (0.5 - 1.5)",
    "Found virtual keyboard and mouse",
    "SCSI controller initialized",
    "Loading OS kernel [X] (1.25 - 2.75)",
    "Kernel version 0.8.1.beta",
    "Initializing file system [X] (0.25 - 0.833)",
    "Mounting root file system [X] (0.125 - 0.25)",
    "Loading drivers [X] (1 - 3.5)",
    "Network adapter: Bridged mode",
    "Starting services [X] (2.5 - 10)",
    "VM Ready"
];
  
function loadBios(passBootType, quickBIOS = false) {
    checkLoadFile();
    if (quickBIOS == true) {var quickBIOSTime = 10}
    const startBIOS = new Date();
    const biosscreen = document.getElementById('biosscreen');
    let index = 0;
  
    function addLineWithLoader() {
      if (index < biosLines.length) {
        let line = biosLines[index];
        const loader = document.createElement('div');
        loader.className = 'bios-loader';
        biosscreen.appendChild(loader);
  
        let duration = 0;
      if (line.includes('[X]')) {
        const timeFrame = line.split('(')[1].split(')')[0];
        const [min, max] = timeFrame.split(' - ').map(Number);
        duration = quickBIOSTime / 1000 || ((Math.random() * (max - min) + min).toFixed(2));
        line = line.split("(")[0].replace('[X]', loader.outerHTML);
      }
  
        biosscreen.insertAdjacentHTML('beforeend', `<div class="bios-line">${line}</div>`);
  
        setTimeout(() => {
            document.querySelectorAll(".bios-line").forEach((line) => { try { line.removeChild(line.querySelector(".bios-loader")) } catch (error) {} })
          index++;
          addLineWithLoader();
        }, duration * 1000);
      } else {
        setTimeout(() => {
            biosscreen.classList.remove("current");
            const endBIOS = new Date();
          if (quickBIOS !== true) {
            var BIOSTime = endBIOS - startBIOS;
          } else {
            var BIOSTime = 20000;
          };
            setTimeout(() => {
              document.getElementById('bootscreen').classList.add("current"); initboot(passBootType, BIOSTime);
            }, (BIOSTime / (10 + (1/3))));
        }, 500);
      }
    }
  
    addLineWithLoader();
  }
document.addEventListener('DOMContentLoaded', async function () {
  var bootType = await readBootSetting();
  loadBios(bootType); 
});
  