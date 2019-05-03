function cercaPerArtista() {
  var artista = document.getElementById('nomArtista').value;
  if (artista==null || artista== ""){
    artista = "Melendi";
  }
  var noRegistres = Number(document.getElementById('noArtista').value);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      processarRespostaArtista(this.responseText);
    else{
    if(this.readyState >= 4)
      document.getElementById("artista").innerHTML = "<h3>Hi ha hagut un error de conexio que no te res a veure amb lastfm</h3>";
    }

  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+artista+"&api_key="+API_KEY+"&limit="+noRegistres+"&format=json";
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function processarRespostaArtista(dades) {
  var	myObj = JSON.parse(dades);
  var llista = document.createElement('ul');
  var txt,x;
  txt ="<h3> Search result for artist:" + myObj.results["@attr"].for+"</h3>"; // Com no pot ser fico myObj.results.@attr.for
  txt += "<table class='table table-striped table-responsive table-hover'>";
  txt += "<tr><th>Nom</th><th>URL</th><th>Imatge</th></tr>";
  console.log("Cantidad de artistas:" + myObj.results.artistmatches.artist.length);
  for (var i=0; i< myObj.results.artistmatches.artist.length;i++) {
    if(myObj.results.artistmatches.artist[i].image[2]["#text"]!="")
      txt += "<tr><td>" + myObj.results.artistmatches.artist[i].name + "</td><td>"+ myObj.results.artistmatches.artist[i].url + "</td><td><img src="+ myObj.results.artistmatches.artist[i].image[2]["#text"] +"/></td></tr>";
    else
      txt += "<tr><td>" + myObj.results.artistmatches.artist[i].name + "</td><td>"+ myObj.results.artistmatches.artist[i].url + "</td><td><img src='../img/noIMG.jpg'/></td></tr>";
      }

  txt += "</table>";
  document.getElementById("artist").innerHTML = txt;
}

function cercaPerAlbum() {
  var album = document.getElementById('nomAlbum').value;
  if (album==null || album== ""){
    album = "The Greatest Showman";
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      processarRespostaAlbum(this.responseText);
    else{
    if(this.readyState >= 4)
      document.getElementById("albums").innerHTML = "<h3>Hi ha hagut un error de conexio que no te res a veure amb lastfm</h3>";
    }

  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=album.search&album="+album+"&api_key="+API_KEY+"&limit=5&format=json"
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function processarRespostaAlbum(dades) {
  var	myObj = JSON.parse(dades);
  var llista = document.createElement('ul');
  var txt,x;
  txt ="<h3> Search result for album:" + myObj.results["@attr"].for+"</h3>"; // Com no pot ser fico myObj.results.@attr.for
  txt += "<table class='table table-striped table-responsive table-hover'>";
  txt += "<tr><th>Nom</th><th>Artista</th><th>Url</th><th>Imatge</th></tr>";
  console.log("Cantidad de artistas:" + myObj.results.albummatches.album.length);
  for (var i=0; i< myObj.results.albummatches.album.length;i++) {
    if(myObj.results.albummatches.album[i].image[2]["#text"]!="")
      txt += "<tr><td>" + myObj.results.albummatches.album[i].name + "</td><td>"+ myObj.results.albummatches.album[i].artist + "</td><td>"+ myObj.results.albummatches.album[i].url + "</td><td><img src="+ myObj.results.albummatches.album[i].image[2]["#text"] +"/></td></tr>";
    else
      txt += "<tr><td>" + myObj.results.albummatches.album[i].name + "</td><td>"+ myObj.results.albummatches.album[i].artist + "</td><td>"+ myObj.results.albummatches.album[i].url + "</td><td><img src='../img/noIMG.jpg'/></td></tr>";
      }

  txt += "</table>";
  document.getElementById("albums").innerHTML = txt;
}
