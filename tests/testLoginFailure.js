const url = 'http://localhost:3000/login';

casper.start(url,function(){
    this.echo(this.getTitle());
});

casper.waitForResource(url, function() {
    this.test.assertExists('form', "main form is found");
    this.evaluate(function(){
        document.getElementById("username").value="thisuserdoesnotexist";
        document.getElementById("password").value="thispassworddoesnotexist";
        document.getElementById("login").click();
    });
});

casper.then(function () {
    this.test.assertEqual(this.getTitle(),'Logi sisse', 'Not existing user cant log in')
});

casper.run();