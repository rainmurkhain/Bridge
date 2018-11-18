var socket = io();
socket.on('chat message', (msg) => {
    alert("Keegi on veel siin lehel :O Ta ütles: " + msg);
});
socket.on('new news', (msg) => {
    alert("Keegi on veel siin lehel :O Ta ütles: " + msg);
});