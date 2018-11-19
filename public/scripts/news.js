/*
fetch('/newsJSON').then((res) => {

    console.log("Ma olne siin!");

    const newsJSON = res.json();

    console.log("see on " + newsJSON);

    for (const news in newsJSON) {

        console.log("ma olen siin ja " + news);

        const div = document.createElement("div");
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.background = "red";
        div.style.color = "white";
        div.innerHTML = news.news;

        document.body.appendChild(div);
    }

});
*/

fetch('/newsJSON')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        const allNews = JSON.parse(myJson);
        console.log(allNews);
        console.log(allNews.length);

        for (let i = 0; i < allNews.length; i++) {
            const div = document.createElement("div");
            div.style.width = "80%";
            div.style.margin = "25px 0";
            div.style.padding = "10px 0";
            if (i % 2 === 0) div.style.background = "red";
            else div.style.background = "blue";
            div.style.color = "white";
            div.innerHTML = "<h2>" + allNews[i].title + "</h2><p>" + allNews[i].news + "</p>";

            document.body.appendChild(div);
        }



    });