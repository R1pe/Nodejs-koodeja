
/*
0. npm install <tarvittavat moduulit>
1. Generoitiin palvelimen privaatti avain ja sertifikaatti
2. https.createServer() muodostaa uuden instanssin serveristä, jolla on listen() -metodi joka ottaa vastaan portin ja hostin.
3. avaimen ja sertifikaatin muodostuksessa apua saatiin https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/

Avaimen ja sertifikaatin muodostus linux komennoilla:
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
*/

var https = require("https");
var fs = require("fs");

var port = 1337;
var host = "127.0.0.1";

var options = {
  key: fs.readFileSync("./seacrets/key.pem"),
  cert: fs.readFileSync("./seacrets/cert.pem")
};

console.log("Starting to listen port 1337...");
var a = https.createServer(options, function (req, res) {
  console.log("Request for: " + req.url);
  res.writeHead(200);
  res.end("hello world\n");
}).listen(port, host);
