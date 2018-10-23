function initMap() {
    var tartu = {lat: 58.377379, lng: 26.732936};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: tartu});
    var marker = new google.maps.Marker({position: tartu, map: map});
}