var sisu = document.getElementById("sisu");
var nupp = document.getElementById("naita-koiki");

nupp.onclick = function () {
    if(sisu.className == "open"){
        sisu.className = "";
        nupp.innerHTML = "Näita kõiki"
    }
    else {
        sisu.className = "open";
        nupp.innerHTML = "Näita vähem"
    }
};