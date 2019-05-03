
/*cerca artistes similars al que busque l'usuari i passe la cantitat de artistes similars que es volen.*/
function cercaArtistaSimilar() {
  var artista = document.getElementById('nomArtista').value;
  if (artista==null || artista== ""){
    artista = "Melendi";
  }
  var noRegistres = Number(document.getElementById('noArtista').value);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      processarRespostaArtistaSimilar(this.responseText);
    else{
    if(this.readyState >= 4)
      document.getElementById("artista").innerHTML = "<h3>Hi ha hagut un error de conexio que no te res a veure amb lastfm</h3>";
    }

  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+artista+"&api_key="+API_KEY+"&limit="+noRegistres+"&format=json";
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function       processarRespostaArtistaSimilar(dades) {
  var	myObj = JSON.parse(dades);
  var llista = document.createElement('ul');
  var txt,x;
  txt ="<h3> Resultats de la busqueda de artistes similars a:<br><strong>" + myObj.similarartists["@attr"].artist+"</strong></h3>"; // Com no pot ser fico myObj.results.@attr.for
  txt += "<table class='table table-striped table-responsive table-hover'>";
  txt += "<tr><th>Nom</th><th>URL</th><th>Imatge</th></tr>";
  console.log("Cantidad de artistas similares escogida:" + myObj.similarartists.artist.length);
  for (var i=0; i< myObj.similarartists.artist.length;i++) {
    if(myObj.similarartists.artist[i].image[2]["#text"]!="")
      txt += "<tr><td>" + myObj.similarartists.artist[i].name + "</td><td><a href='"+ myObj.similarartists.artist[i].url + "'>"+ myObj.similarartists.artist[i].url + "</a></td><td><img src="+ myObj.similarartists.artist[i].image[2]["#text"] +"/></td></tr>";
    else
      txt += "<tr><td>" + myObj.similarartists.artist[i].name + "</td><td><a href='"+ myObj.similarartists.artist[i].url + "'>"+ myObj.similarartists.artist[i].url + "</a></td><td><img src='../img/noIMG.jpg'/></td></tr>";
      }

  txt += "</table>";
  document.getElementById("artist").innerHTML = txt;
}


/*cerca els tags que mes s'ham posat a un aritsta*/
function topTags() {
  var artista = document.getElementById('nomArtistaTags').value;
  if (artista==null || artista== ""){
    artista = "Melendi";
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      processarRespostatopTags(this.responseText);
    else{
    if(this.readyState >= 4)
      document.getElementById("artista").innerHTML = "<h3>Hi ha hagut un error de conexio que no te res a veure amb lastfm</h3>";
    }

  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist="+artista+"&api_key="+API_KEY+"&format=json";
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function       processarRespostatopTags(dades) {
  var	myObj = JSON.parse(dades);
  var llista = document.createElement('ul');
  var txt,x;
  txt ="<h3> Resultats de la busqueda dels top tags de l'artista:<br><strong>" + myObj.toptags["@attr"].artist+"</strong></h3>"; // Com no pot ser fico myObj.results.@attr.for
  txt += "<table class='table table-striped table-responsive table-hover'>";
  txt += "<tr><th>Nom</th><th>URL</th><th>Cantitat de tags a l'artista</th></tr>";
  console.log("Cantidad de artistas similares escogida:" + myObj.toptags.tag.length);
  for (var i=0; i< myObj.toptags.tag.length;i++) {
      txt += "<tr><td>" + myObj.toptags.tag[i].name + "</td><td><a href='"+ myObj.toptags.tag[i].url + "'>"+ myObj.toptags.tag[i].url + "</a></td><td>" + myObj.toptags.tag[i].count + "</td>";
    }

  txt += "</table>";
  document.getElementById("artist").innerHTML = txt;
}


/*cerca artistes per tags.*/
function cercaArtistaPerTag() {
  var tag = document.getElementById('tagCerca').value;
  if (tag==null || tag== ""){
    tag = "Reagge";
  }
  var noRegistres = Number(document.getElementById('noTags').value);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      processarRespostaArtistaPerTag(this.responseText);
    else{
    if(this.readyState >= 4)
      document.getElementById("artista").innerHTML = "<h3>Hi ha hagut un error de conexio que no te res a veure amb lastfm</h3>";
    }

  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag="+tag+"&api_key="+API_KEY+"&limit="+noRegistres+"&format=json";
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function       processarRespostaArtistaPerTag(dades) {
  var	myObj = JSON.parse(dades);
  var llista = document.createElement('ul');
  var txt,x;
  txt ="<h3> Resultats de la busqueda de artistes per tipus de musica:<br><strong>" + myObj.topartists["@attr"].tag+"</strong></h3>"; // Com no pot ser fico myObj.results.@attr.for
  txt += "<table class='table table-striped table-responsive table-hover'>";
  txt += "<tr><th>Nom</th><th>URL</th><th>Imatge</th></tr>";
  console.log("Cantidad de artistas similares escogida:" + myObj.topartists.artist.length);
  for (var i=0; i< myObj.topartists.artist.length;i++) {
    if(myObj.topartists.artist[i].image[2]["#text"]!="")
      txt += "<tr><td>" + myObj.topartists.artist[i].name + "</td><td><a href='"+ myObj.topartists.artist[i].url + "'>"+myObj.topartists.artist[i].url+"</a></td><td><img src="+ myObj.topartists.artist[i].image[2]["#text"] +"/></td></tr>";
    else
      txt += "<tr><td>" + myObj.topartists.artist[i].name + "</td><td>"+ myObj.topartists.artist[i].url + "</td><td><img src='../img/noIMG.jpg'/></td></tr>";
      }

  txt += "</table>";
  document.getElementById("artist").innerHTML = txt;
}
