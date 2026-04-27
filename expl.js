// Самый простой тест - просто алерт
alert('CSP BYPASS SUCCESS!');

// И добавим на страницу видимый элемент, чтобы точно увидеть, что скрипт выполнился
var div = document.createElement('div');
div.style.cssText = 'position:fixed; bottom:10px; right:10px; background:red; color:white; padding:10px; z-index:9999; font-size:20px;';
div.innerHTML = '✅ СКРИПТ СРАБОТАЛ! ✅';
document.body.appendChild(div);

// Посмотрим, какие куки есть (если есть)
console.log('Cookies:', document.cookie);

// Проверим, какой URL страницы
console.log('Current URL:', window.location.href);