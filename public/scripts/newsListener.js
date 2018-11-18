var socket = io();
socket.on('chat message', (msg) => {

});
socket.on('new news', (msg) => {
    alert("Keegi on veel siin lehel :O Ta ütles: " + msg);
});