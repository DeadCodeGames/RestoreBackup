async function startLockscreenProcesses(loadtime) {
    const baseTime = new Date(await getBaseDate()).getTime();
    const lockscreen = document.getElementById("lockscreen");
    const lockscreenbefore = {
        "time": lockscreen.querySelector("locktime"),
        "date": lockscreen.querySelector("lockdate"),
        "day": lockscreen.querySelector("lockday")
    }

    const lockscreenUpdateTime = setInterval(() => {
        lockscreenbefore.time.textContent = new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
        lockscreenbefore.date.textContent = new Date(new Date("2025-02-25").getTime() - (baseTime - new Date().getTimezoneOffset() * 60000) + (new Date().getTime() - new Date().getTimezoneOffset() * 60000)).toLocaleDateString("en-US", { "day": "2-digit", "month": "2-digit", "year": "numeric" });
        lockscreenbefore.day.textContent = new Date(new Date("2025-02-25").getTime() - (baseTime - new Date().getTimezoneOffset() * 60000) + (new Date().getTime() - new Date().getTimezoneOffset() * 60000)).toLocaleString("en-US", { "weekday": "long" });
    }, 5);
}