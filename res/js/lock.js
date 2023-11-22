async function startLockscreenProcesses(loadtime) {
    const baseTime = new Date(await getBaseDate()).getTime();
    const lockscreen = document.getElementById("lockscreen");
    const lockscreenbefore = {
        "time": lockscreen.querySelector("locktime"),
        "date": lockscreen.querySelector("lockdate"),
        "day": lockscreen.querySelector("lockday"),
    }

    const lockscreenUpdateTime = setInterval(() => {
        lockscreenbefore.time.textContent = new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
        lockscreenbefore.date.textContent = new Date(1740441600000 + ((new Date().getTime() - new Date().getTime() % 86400000) - baseTime)).toLocaleDateString("en-US", { "day": "2-digit", "month": "2-digit", "year": "numeric" });
        lockscreenbefore.day.textContent = new Date(1740441600000 + ((new Date().getTime() - new Date().getTime() % 86400000) - baseTime)).toLocaleString("en-US", { "weekday": "long" });
    }, 5);
}