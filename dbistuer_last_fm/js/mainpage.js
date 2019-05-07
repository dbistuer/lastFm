
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







function  removeTag() {
  //calculateApiSignatureStack();
  var artista = document.getElementById('artistaRemove').value;
var track = document.getElementById('trackRemove').value;
var tag = document.getElementById('tagRemove').value;

var data = {
       method: 'track.removeTag',
       artist: artista,
       track: track,
       tag: tag,
       token: sessionStorage.getItem('token'),
       api_key: API_KEY,
       sk: sessionStorage.getItem('sk')
       }
       var apiSig = last_fm_calculate_apisig(data)
       data['api_sig']=apiSig;
  $.ajax({

      type : 'POST',
      url : 'http://ws.audioscrobbler.com/2.0/',

      data: data,
      dataType : 'json',
      success : function(data) {
          alert(data);
              $('#status').html(data.user.name);
         },
      error : function(code, message){
           $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
      }
  });
}

function last_fm_calculate_apisig(params){

  ss = "";
        st = [];
        so = {};
        so['api_key'] = params['api_key'];
        so['token'] = params['token'];
        Object.keys(params).forEach(function(key){
            st.push(key); // Get list of object keys
        });
        st.sort(); // Alphabetise it
        st.forEach(function(std){
            ss = ss + std + params[std]; // build string
        });
        ss += SHARED_SECRET;
  return md5(unescape(encodeURIComponent(ss)));
}

function calculateApiSignatureStack(){

          // Set elsewhere but hacked into this example:
          var data = {
              'token':sessionStorage.getItem('token'),
              'api_key': API_KEY
          };

        // Kick it off.
        last_fm_call(last_fm_data);


        // Low level API call, purely builds a POSTable object and calls it.
        function last_fm_call(data){

            var API_SIG = last_fm_calculate_apisig(data);
        /*
        .*/
            sessionStorage.setItem('API_SIG', API_SIG);
            console.log("Post data: Last token " + captured + "ApiKey: "+ API_KEY + "ApiSig: " + API_SIG);
            //sessionStorage.setItem("myApiSig",post_data.api_sig );

            var last_url='http://ws.audioscrobbler.com/2.0/?method=auth.getSession';
            $.ajax({
              type: 'GET',
              url: last_url,
              data : 'token='+captured+
                     '&api_key='+API_KEY+
                     '&api_sig='+API_SIG,
              //data: post_data,
              dataType: 'xml',
              //"success" gets called when the returned code is a "200" (successfull request). "error" gets called whenever another code is returned (e.g. 404, 500).
              success: function(res){
                  //No caldria aquesta instrucció perque ja guaredem els que ens convé en sessionStorage
                  last_fm_data[method] = res;
                  //var	myresposta = JSON.parse(res);
                  console.log("Resposta: Name " + res.session.name);// Should return session key.
                  console.log("Resposta: Key " + res.session.key);

                  //store session key for further authenticate operations...
                  sessionStorage.setItem("mySessionUser", res.session.name);
                  sessionStorage.setItem("sk", res.session.key);
              },
              error : function(xhr, status, error){
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    console.log('Error - ' + errorMessage);
              }
             });
        }
      }
