const url = 'http://localhost:3000/login';

casper.start(url,function(){
    this.echo(this.getTitle());
});

casper.waitForResource(url, function() {
    this.test.assertExists('form', "main form is found");
    this.evaluate(function(){
        document.getElementById("username").value="admin";
        document.getElementById("password").value="admin";
        document.getElementById("login").click();
    });
});

casper.then(function () {
    this.test.assertEqual(this.getTitle(),'EESTI BRIDŽILIIDU LEHT (projekt)', 'Admin user can log in')
});

casper.run();