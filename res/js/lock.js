async function startLockscreenProcesses(loadtime) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: "auto", style: 'long' });
    const baseTime = new Date(await getBaseDate());
    const lockscreen = document.getElementById("lockscreen");
    var notifState = await readLockNotifState();

    var lockscreenUpdateTime = setInterval(() => {
        document.querySelector("div#lockscreen.screen>before>timeanddate>string#locktime").textContent = new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
        document.querySelector("div#lockscreen.screen>before>timeanddate>string#lockdate").textContent = new Date(new Date("2025-02-25").getTime() - (baseTime - new Date().getTimezoneOffset() * 60000) + (new Date().getTime() - new Date().getTimezoneOffset() * 60000)).toLocaleDateString("en-US", { "day": "2-digit", "month": "2-digit", "year": "numeric" });
        document.querySelector("div#lockscreen.screen>before>timeanddate>string#lockday").textContent = new Date(new Date("2025-02-25").getTime() - (baseTime - new Date().getTimezoneOffset() * 60000) + (new Date().getTime() - new Date().getTimezoneOffset() * 60000)).toLocaleString("en-US", { "weekday": "long" });
        if (lockscreen.querySelector("lockscreennotification")) {
            if (lockscreen.querySelector("lockscreennotification").querySelector("notifdetails")) {
                if (lockscreen.querySelector("lockscreennotification").querySelector("notifdetails").querySelector("timer")) {
                    if (Math.abs(Math.floor((((new Date().getTime()) - (new Date().getTimezoneOffset() * 60000) - (new Date(baseTime).getTime())) / 86400000))) < 7) {
                        lockscreen.querySelector("lockscreennotification").querySelector("notifdetails").querySelector("timer").textContent = rtf.format(-Math.floor(((((new Date().getTime()) - (new Date().getTimezoneOffset() * 60000)) - (new Date(baseTime).getTime())) / 86400000)), "day")
                    } else if (Math.abs(Math.floor((((new Date().getTime()) - (new Date().getTimezoneOffset() * 60000) - (new Date(baseTime).getTime())) / 86400000))) < 30) {
                        lockscreen.querySelector("lockscreennotification").querySelector("notifdetails").querySelector("timer").textContent = rtf.format(-Math.floor(((((new Date().getTime()) - (new Date().getTimezoneOffset() * 60000)) - (new Date(baseTime).getTime())) / 604800000)), "week")
                    } else if (Math.abs(Math.floor((((new Date().getTime()) - (new Date().getTimezoneOffset() * 60000) - (new Date(baseTime).getTime())) / 86400000))) < 365) {
                        lockscreen.querySelector("lockscreennotification").querySelector("notifdetails").querySelector("timer").textContent = rtf.format(-Math.floor(((((new Date().getTime()) - (new Date().getTimezoneOffset() * 60000)) - (new Date(baseTime).getTime())) / 2629743000)), "month")
                    } else {
                        lockscreen.querySelector("lockscreennotification").querySelector("notifdetails").querySelector("timer").textContent = rtf.format(-Math.floor(((((new Date().getTime()) - (new Date().getTimezoneOffset() * 60000)) - (new Date(baseTime).getTime())) / 31556926000)), "year")
                    }
                }
            }
        }
    }, 5);

    if (notifState == 0) {
        writeLockNotifState(1);
        setTimeout(() => {
            lockscreen.querySelector("before").innerHTML += `<lockscreennotification type="calendar"><header><img><span>Calendar</span></header><notifdetails><eventname>J's Birthday</eventname><timer></timer></notifdetails></lockscreennotification>`;
        }, loadtime / 4);
    } else if (notifState == 1) {
        lockscreen.querySelector("before").innerHTML += `<lockscreennotification type="calendar"><header><img><span>Calendar</span></header><notifdetails><eventname>J's Birthday</eventname><timer></timer></notifdetails></lockscreennotification>`;
    }
}