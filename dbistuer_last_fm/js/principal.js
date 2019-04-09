function cercaPerArtista() {
  var artista = document.getElementById('nomArtista').value;
  if (artista==null || artista== ""){
    artista = "Swan Fyahbwoy";
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      processarResposta(this.responseText);
    else
      document.getElementById("artist").innerHTML = "<h3>Hi ha hagut un error de conexio que no te res a veure amb lastfm</h3>";

  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+artista+"&api_key="+API_KEY+"&limit=10&format=json";
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function cercaPerAlbum() {
  var artista = document.getElementById('nomAlbum').value;
  if (artista==null || artista== ""){
    album = "The Greatest Showman";
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      processarResposta(this.responseText);
    else
      document.getElementById("albums").innerHTML = "<h3>Hi ha hagut un error de conexio que no te res a veure amb lastfm</h3>";

  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+album+"&api_key="+API_KEY+"&limit=5&format=json"
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function processarResposta(dades) {
  var	myObj = JSON.parse(dades);
  var llista = document.createElement('ul');
  var txt,x;
  txt ="<h3> Search result for artist:" + myObj.results["@attr"].for+"</h3>"; // Com no pot ser fico myObj.results.@attr.for
  txt += "<table class='table table-striped table-responsive'>";
  txt += "<tr><th>Nom</th><th>URL</th><th>Imatge</th></tr>";
  console.log("Cantidad de artistas:" + myObj.results.artistmatches.artist.length);
  for (var i=0; i< 10;i++) {
    if(myObj.results.artistmatches.artist[i].image[2]["#text"]!="")
      txt += "<tr><td>" + myObj.results.artistmatches.artist[i].name + "</td><td>"+ myObj.results.artistmatches.artist[i].url + "</td><td><img src="+ myObj.results.artistmatches.artist[i].image[2]["#text"] +"/></td></tr>";
    else
      txt += "<tr><td>" + myObj.results.artistmatches.artist[i].name + "</td><td>"+ myObj.results.artistmatches.artist[i].url + "</td><td><img src='../img/noIMG.jpg'/></td></tr>";
      }

  txt += "</table>";
  document.getElementById("artist").innerHTML = txt;
}
