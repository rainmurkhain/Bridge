$.get('https://ipinfo.io', function (response) {
    $("#ip").html('IP aadress:<b>' + response.ip + '</b>');
    $("#country").html('Riik:<b>' + response.country + '</b>');
    $("#location").html('Asukoht:<b>' + response.location + '</b>');
}, 'json');