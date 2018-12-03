const url = 'http://localhost:3000/register';
const url2 = 'http://localhost:3000/login';

//let nimi = "";
//let par = "";


casper.start(url,function(){
    this.echo(this.getTitle());
});

casper.waitForResource(url, function() {

    this.test.assertExists('form', "register form is found");

    this.evaluate(function(){
        document.getElementById("username").value="testkasutaja";
        document.getElementById("password").value="testkasutajaparool";
        document.getElementById("firstname").value="Eesnimi";
        document.getElementById("lastname").value="Perenimi";
        document.getElementById("register").click();
    });

});

casper.then(function () {
    this.test.assertEqual(this.getTitle(),'Logi sisse', 'User registration')
});

casper.thenOpen(url2);

casper.waitForResource(url2, function() {
    this.test.assertExists('form', "login form is found");
    this.evaluate(function(){
        document.getElementById("username").value="testkasutaja";
        document.getElementById("password").value="testkasutajaparool";
        document.getElementById("login").click();
    });
});

casper.then(function () {
    this.test.assertEqual(this.getTitle(),'EESTI BRIDŽILIIDU LEHT (projekt)', 'User login')
});

casper.run();


function looString(pikkus) {
    var text = "";
    var valikud = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < pikkus; i++)
        text += valikud.charAt(Math.floor(Math.random() * valikud.length));

    return text;
}

