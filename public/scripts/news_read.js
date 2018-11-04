var btn = document.getElementById("btn");
let uudised = document.getElementById("uudiste-info");

function init(){
    console.log("HELLOOOOOOOOOOOOOO");
    let uudised_request = new XMLHttpRequest();
    uudised_request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(this.responseText));
            let data = $.getJSON('http://bridge-ee.herokuapp.com/news', function(andmed) {
                //data is the JSON string
                return andmed;

            });
            console.log(data)

            let strout = "<ul>";

            strout += "</ul>";
            document.getElementById("output").innerHTML = strout;
        }
    };
    uudised_request.open("GET", "news_json.js", true);
    uudised_request.send();
}
window.onload = init;



