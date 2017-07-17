/*
Palveliment toteuttamisen vaiheet:
0. Asennettiin npm:lla vaadittu moduuli http
1. Alustettiin file system ja http muuttujat
2. Maariteltiin portti ja ip-osoite
3. Luotiin serveri kayttaen http moduulia.
  3.1. http.createServer() funktio ottaa vastaan parametrina anonyymin funktion, joka ottaa vastaan parametrina http requestin ja responsen.
  3.2. reposonse muuttujaan kasataan mita halutaan palauttaa palvelimelta. Tassa tapauksessa .html file tai 404 jos pyydettya tiedostoa ei loydy
    3.2.1. file system moduulia kaytetaan maarittelemaan mika tiedosto requestin mukana palautetaan if-else lausekkeessa.
4. Maaritelty http serverilla on funktio server.listen() , joka ottaa vastaan portin, ip-osoitteen ja anonyymin funktion.
  4.1. Anaonyymilla funktiolla logitetaan mita porttia kuunnellaan.
5. Luotiin config.json tiedosto ./ alle johon maariteltiin ip-osoite ja portti.
  5.1. Nyt muutoksia ei tarvitse tehda kuin config-tiedostoon, jolloin se muuttuu kaikkii paikkoihin.
6. Node.js:n file system moduulilla on funktio fs.watchFile(), joka ottaa parametrina tiedoston jota se kuuntelee stringina ja anonyymin funktion.
  6.1. Anonyymi funktio on maaritelty ilmoittamaan kun muutoksia tapahtuu config.json tiedostossa.

Muita huomioita:
- Kun requestissa pyydetaan / pitaisi nayttaa index.html. Tama on nyt toteutettu if lausekkeessa server muuttujan maarittelyn yhteydessa.
- "npm install <module>" -komento asentaa <module>:n ./node_modules kansioon.
*/

// Initialization of the variables host, port and server
var http = require('http');
var fs = require("fs") // File system module

var jsonObj = JSON.parse(fs.readFileSync("config.json"));

console.log(jsonObj);

var host = jsonObj.host;
var port = jsonObj.port;
//var host = "127.0.0.1";
//var port = 1337;


// Creating the webserver and writing the response
var server = http.createServer(function(request, response) {
    console.log("Received request for: " + request.url);

    var requrl = "." + request.url;
    if (request.url ===  "/") {requrl = "./index.html"}


    fs.readFile(requrl , function(error, data) {
      if (error) {
         response.writeHeader(404, {"Content-type":"text/plain"});
         response.end("We were not able to find the page you were looking for.");
      } else {
         response.writeHeader(200, {"Content-type":"text/html"});
         response.end(data);
      }
   });
});

// Start to listen on the port
server.listen(port, host, function(){
   console.log("Listening " + host + ":" + port);
});

// Listen for changes made to config file
fs.watchFile("config.json", () => {
   console.log("Changes happened in config.json");
});
