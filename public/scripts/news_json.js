
let data = $.getJSON('http://bridge-ee.herokuapp.com/news', function(andmed) {
    //data is the JSON string
    return andmed;

});
data.toString();