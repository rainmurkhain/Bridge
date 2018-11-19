var socket = io();
/*
socket.on('chat message', (msg) => {
    alert("Keegi on veel siin lehel :O Ta ütles: " + msg);
});
*/
socket.on('new news', () => {
    fetch('/newsJSON')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            const allNews = JSON.parse(myJson);

            const div = document.createElement("div");
            div.style.width = "80%";
            div.style.height = "100px";
            div.style.background = "green";
            div.style.color = "white";
            div.innerHTML = allNews[allNews.length - 1].news;

            document.body.appendChild(div);

        });
});