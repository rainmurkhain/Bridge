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
            div.style.margin = "25px 0";
            div.style.padding = "10px 0";
            div.style.background = "green";
            div.style.color = "white";
            div.innerHTML = "<h2>" + allNews[allNews.length - 1].title + "</h2><p>" + allNews[allNews.length - 1].news + "</p>";

            document.body.appendChild(div);

        });
});