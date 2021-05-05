var express = require("express");
var serveur = require('http').createServer(express);
var io = require('socket.io')(serveur);

// res.sendFile(`../public/index.html`)
express.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', (socket)=>{
  console.log("un utilisateur connecté !");

  socket.on('disconnect', ()=>{
    console.log("un utilisateur déconnecté !");
  });

  socket.on('chat message', (msg)=>{
    console.log(msg);
    io.emit('chat message', msg);
  });

});

serveur.listen(8080, () => {
  console.log("port 8080");
});