fetch('newsJSON').then((res) => {


    const newsJSON = res.json();

    for (news in newsJSON) {

        const div = document.createElement("div");
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.background = "red";
        div.style.color = "white";
        div.innerHTML = news.news;

        document.body.appendChild(div);
    }

});

    /*


        */
