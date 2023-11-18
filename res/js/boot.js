function initboot(type, loadtime) {
    setTimeout(() => {
        document.querySelector("div#bootscreen").classList.add("hasosloader");
        splitboot(type);
    }, loadtime/10);
};