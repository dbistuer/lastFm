var API_KEY="27ec60ec0e2abdbea320f9f93394e807";
var SHARED_SECRET="6fc2c721a8743addf75d378c6ac451cc";
var USER='dbistuer'

var url = window.location.href; // or window.location.href for current url
var captured = /token=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var result = captured ? captured : 'myDefaultValue';
console.log(captured);

/*
Metode: https://www.last.fm/api/show/auth.getSession
Objective: Fetch a session key for a user. The third step in the authentication process. See the authentication how-to for more information.
          ( as we are making a web application...https://www.last.fm/api/webauth)
Params:
token (Required) : A 32-character ASCII hexadecimal MD5 hash returned by step 1 of the authentication process (following the granting of
                  permissions to the application by the user)
api_key (Required) : A Last.fm API key.
api_sig (Required) : A Last.fm method signature. See authentication for more information

Api_sig requereix uns quants canvis ( calculs complicats que he anant fent)...

Result JSON expected:
exit ->
{
  "session": {
    "subscriber": 0,
    "name": "dbistuer",
    "key": "fem3L_nnsWNwD_yGL4mtVRPOlblLynx5"
  }
}
error ->
{
  "error": 4,
  "message": "Unauthorized Token - This token has not been issued"
}
*/
function calculateApiSignatureStack()
{

          // Set elsewhere but hacked into this example:
        var last_fm_data = {
            'last_token':captured,
            'user': 'bob',
            'secret': SHARED_SECRET
        };

        // Kick it off.
        last_fm_call('auth.getSession', {'token': last_fm_data['last_token']});


        // Low level API call, purely builds a POSTable object and calls it.
        function last_fm_call(method, data){

          //data seria {'token': last_fm_data['last_token']} que seria captured o sessionStoragemyToken
            // param data - dictionary.Populate Values on the Object s you'll see below the Key values can be any object and are not limited to Strings.
            last_fm_data[method] = false;
            // Somewhere to put the result after callback.

            // Append some static variables

            //data['format'] = 'json';
            data['method'] = method;

            var API_SIG = last_fm_calculate_apisig(data);
        /*
        .*/
            sessionStorage.setItem('API_SIG', API_SIG);
            console.log("Post data: Last token " + captured + "ApiKey: "+ API_KEY + "ApiSig: " + API_SIG);
            //sessionStorage.setItem("myApiSig",post_data.api_sig );

            var last_url="http://ws.audioscrobbler.com/2.0/?method=auth.getSession";
            $.ajax({
              type: "GET",
              url: last_url,
              data : '&token='+captured+
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
                  sessionStorage.setItem("mySessionKey", res.session.key);
              },
              error : function(xhr, status, error){
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    console.log('Error - ' + errorMessage);
              }
             });
        }

        function last_fm_calculate_apisig(params){

          //Crec que només necessitem apikey, token i secret i no necessitem params, els podem treure de sessionStorage
          //Calcula l'apiSig a partir dels valors d'abans...
          //  var APIsignature = "api_key"+API_KEY+"methodauth.getSessiontoken"+params['token']+SHARED_SECRET
          var APIsignature = "api_key"+API_KEY+"methodauth.getSessiontoken"+capured+SHARED_SECRET

            var hashed_sec = md5(unescape(encodeURIComponent(APIsignature)));
            console.log("La apiSig es: " + hashed_sec);
            // Correct when calculated elsewhere.



            return hashed_sec; // Returns signed POSTable object
        }
}


function responderCodigoError(x)
{
    switch (x){
        case 1:
            console.log("1 : This error does not exist");
            break;
        case 2:
            console.log("2 : Invalid service -This service does not exist");
            break;
        case 3:
            console.log("3 : Invalid Method - No method with that name in this package");
            break;
        case 4:
            console.log("4 : Authentication Failed - You do not have permissions to access the service");
            break;
        case 5:
            console.log("5 : Invalid format - This service doesn't exist in that format");
            break;
        case 6:
            console.log("6 : Invalid parameters - Your request is missing a required parameter");
            break;
        case 7:
            console.log("7 : Invalid resource specified");
            break;
        case 8:
            console.log("8 : Operation failed - Most likely the backend service failed. Please try again.");
            break;
        case 9:
            console.log("9 : Invalid session key - Please re-authenticate");
            break;
        case 10:
            console.log("10 : Invalid API key - You must be granted a valid key by last.fm");
            break;
        case 11:
            console.log("11 : Service Offline - This service is temporarily offline. Try again later.");
            break;
        case 12:
            console.log("12 : Subscribers Only - This station is only available to paid last.fm subscribers");
            break;
        case 13:
            console.log("13 : Invalid method signature supplied");
            break;
        case 14:
            console.log("14 : Unauthorized Token - This token has not been authorized");
            break;
        case 15:
            console.log("15 : This item is not available for streaming.");
            break;
        case 16:
            console.log("16 : The service is temporarily unavailable, please try again.");
            break;
        case 17:
            console.log("17 : Login: User requires to be logged in");
            break;
        case 18:
            console.log("18 : Trial Expired - This user has no free radio plays left. Subscription required.");
            break;
        case 19:
            console.log("19 : This error does not exist");
            break;
        case 20:
            console.log("20 : Not Enough Content - There is not enough content to play this station");
            break;
        case 21:
            console.log("21 : Not Enough Members - This group does not have enough members for radio");
            break;
        case 22:
            console.log("22 : Not Enough Fans - This artist does not have enough fans for for radio");
            break;
        case 23:
            console.log("23 : Not Enough Neighbours - There are not enough neighbours for radio");
            break;
        case 24:
            console.log("24 : No Peak Radio - This user is not allowed to listen to radio during peak usage");
            break;
        case 25:
            console.log("25 : Radio Not Found - Radio station not found");
            break;
        case 26:
            console.log("26 : API Key Suspended - This application is not allowed to make requests to the web services");
            break;
        case 27:
            console.log("27 : Deprecated - This type of request is no longer supported");
            break;
        case 29:
            console.log("29 : Rate Limit Exceded - Your IP has made too many requests in a short period, exceeding our API guidelines");
            break;
        default:
            console.log("Ha sorgit un error, pero no te res a veure amb lastfm");
            break;
      }
}
/*
Metode: https://www.last.fm/api/show/user.getInfo
Objective: Get information about a user profile.
Params:
user (Optional) : The user to fetch info for. Defaults to the authenticated user.
                  NOTE NOW IS REQUIRED, WITHOUT THIS IT DOESNT WORK
api_key (Required) : A Last.fm API key.

Result JSon :
{
  "user": {
    "playlists": "0",
    "playcount": "1718",
    "gender": "n",
    "name": "dbistuer",
    "subscriber": "0",
    "url": "https:\/\/www.last.fm\/user\/dbistuer",
    "country": "Spain",
    "image": [
      {
        "size": "small",
        "#text": "https:\/\/lastfm-img2.akamaized.net\/i\/u\/34s\/cc637716959b4acecaa1a307e300f61f.png"
      },
      {
        "size": "medium",
        "#text": "https:\/\/lastfm-img2.akamaized.net\/i\/u\/64s\/cc637716959b4acecaa1a307e300f61f.png"
      },
      {
        "size": "large",
        "#text": "https:\/\/lastfm-img2.akamaized.net\/i\/u\/174s\/cc637716959b4acecaa1a307e300f61f.png"
      },
      {
        "size": "extralarge",
        "#text": "https:\/\/lastfm-img2.akamaized.net\/i\/u\/300x300\/cc637716959b4acecaa1a307e300f61f.png"
      }
    ],
    "registered": {
      "unixtime": "1172080539",
      "#text": 1172080539
    },
    "type": "user",
    "age": "0",
    "bootstrap": "0",
    "realname": ""
  }
}
*/
$.ajax({
    type : 'GET',
    url : 'http://ws.audioscrobbler.com/2.0/?',
    data : 'method=user.getinfo&' +
           'user='+USER+'&'+
           'api_key='+API_KEY+'&' +
           'format=json',
    dataType : 'json',
    success : function(data) {
            $('#artistName').html(data.user.name);
           $('#success #artistImage').html('<img src="' + data.user.image[1]['#text'] + '" />');
           $('#success #artistBio').html(data.user.playcount);
       },
    error : function(code, message){
         $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
    }
});
/*
Metode: https://www.last.fm/api/show/user.getInfo
Objective: Get information about a user profile.
Params:
user (Optional) : The user to fetch info for. Defaults to the authenticated user.
                  NOTE NOW IS REQUIRED, WITHOUT THIS IT DOESNT WORK
api_key (Required) : A Last.fm API key.

Result XML :
<user>
    <id>1000002</id>
    <name>RJ</name>
    <realname>Richard Jones </realname>
    <url>http://www.last.fm/user/RJ</url>
    <image>http://userserve-ak.last.fm/serve/126/8270359.jpg</image>
    <country>UK</country>
    <age>27</age>
    <gender>m</gender>
    <subscriber>1</subscriber>
    <playcount>54189</playcount>
    <playlists>4</playlists>
    <bootstrap>0</bootstrap>
    <registered unixtime="1037793040">2002-11-20 11:50</registered>
</user>
*/
function loadUserInfoXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user="+USER+"&api_key="+API_KEY, true);
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Data</th><th>Value</th><th>Altre</th></tr>";
  var x = xmlDoc.getElementsByTagName("user");
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("playcount")[0].childNodes[0].nodeValue +
    "</td><td><img src="+
    x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue +
   "></img></td></tr>";
   console.log(x[i]);
  }
  document.getElementById("demo").innerHTML = table;
}
/*

Metode: https://www.last.fm/api/show/chart.getTopArtists
Objective: Get the top artists chart
Params:
page (Optional) : The page number to fetch. Defaults to first page.
limit (Optional) : The number of results to fetch per page. Defaults to 50.
api_key (Required) : A Last.fm API key.:

Params
page (Optional) : The page number to fetch. Defaults to first page.
limit (Optional) : The number of results to fetch per page. Defaults to 50.
api_key (Required) : A Last.fm API key.

Exmaple response in json:

{
  "artists": {
    "artist": [
      {
        "name": "Ariana Grande",
        "playcount": "103662311",
        "listeners": "1089358",
        "mbid": "f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
        "url": "https://www.last.fm/music/Ariana+Grande",
        "streamable": "0",
        "image": [
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/34s/32b841c78d0982a13d616b756a197d5c.png",
            "size": "small"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/64s/32b841c78d0982a13d616b756a197d5c.png",
            "size": "medium"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/174s/32b841c78d0982a13d616b756a197d5c.png",
            "size": "large"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/32b841c78d0982a13d616b756a197d5c.png",
            "size": "extralarge"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/32b841c78d0982a13d616b756a197d5c.png",
            "size": "mega"
          }
        ]
      },
      {
        "name": "Queen",
        "playcount": "190713412",
        "listeners": "4015802",
        "mbid": "420ca290-76c5-41af-999e-564d7c71f1a7",
        "url": "https://www.last.fm/music/Queen",
        "streamable": "0",
        "image": [
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/34s/39be92dbb8013de8cd1dafc3430ff3d8.png",
            "size": "small"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/64s/39be92dbb8013de8cd1dafc3430ff3d8.png",
            "size": "medium"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/174s/39be92dbb8013de8cd1dafc3430ff3d8.png",
            "size": "large"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/39be92dbb8013de8cd1dafc3430ff3d8.png",
            "size": "extralarge"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/39be92dbb8013de8cd1dafc3430ff3d8.png",
            "size": "mega"
          }
        ]
      },
      {
        "name": "Lady Gaga",
        "playcount": "284529030",
        "listeners": "3813553",
        "mbid": "650e7db6-b795-4eb5-a702-5ea2fc46c848",
        "url": "https://www.last.fm/music/Lady+Gaga",
        "streamable": "0",
        "image": [
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/34s/91b8e5009f78f05dfd18cfda78f9c2de.png",
            "size": "small"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/64s/91b8e5009f78f05dfd18cfda78f9c2de.png",
            "size": "medium"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/174s/91b8e5009f78f05dfd18cfda78f9c2de.png",
            "size": "large"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/91b8e5009f78f05dfd18cfda78f9c2de.png",
            "size": "extralarge"
          },
          {
            "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/91b8e5009f78f05dfd18cfda78f9c2de.png",
            "size": "mega"
          }
        ]
      }......
    ],
    "@attr": {
      "page": "1",
      "perPage": "50",
      "totalPages": "56122",
      "total": "2806089"
    }
  }
}
*/
function loadChartTopArtistsJSONDoc()
{
  if (window.XMLHttpRequest) {
					// Mozilla, Safari, IE7+
					httpRequest = new XMLHttpRequest();
					console.log("Creat l'objecte a partir de XMLHttpRequest.");
				}
				else if (window.ActiveXObject) {
					// IE 6 i anteriors
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
					console.log("Creat l'objecte a partir de ActiveXObject.");
				}
				else {
					console.error("Error: Aquest navegador no suporta AJAX.");
				}

			//	httpRequest.onload = processarResposta;
				httpRequest.onprogress = mostrarProgres;
        var urlquery ="http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key="+API_KEY+"&format=json";
        httpRequest.onreadystatechange = processarCanviEstat;



        httpRequest.open('GET', urlquery, true);
				httpRequest.overrideMimeType('text/plain');
				httpRequest.send(null);

        function processarCanviEstat() {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            console.log("Exit transmissio.");
            processarResposta(httpRequest.responseText);
          }
        }
				function processarResposta(dades) {
				  var	myObj = JSON.parse(dades);
          var llista = document.createElement('ul');
          var txt,x="";
          txt += "<table border='1'>";
          txt += "<tr><th>Nom</th><th>URL</th><th>Imatge</th></tr>";
          console.log("Cantidad de artistas:" + myObj.artists.artist.length);
          for (var i=0; i< 10;i++) {
              txt += "<tr><td>" + myObj.artists.artist[i].name + "</td><td>"+ myObj.artists.artist[i].url + "</td><td><img src="+ myObj.artists.artist[i].image[2]["#text"] +"/></td></tr>";
              }
/*
          for (x in myObj) {
              txt += "<tr><td>" + myObj[x].artists.artist.name + "</td></tr>";
            }*/
          txt += "</table>";
          document.getElementById("artist").innerHTML = txt;
        }

				}

				function mostrarProgres(event) {
					  if (event.lengthComputable) {
					    var progres = 100 * event.loaded / event.total;
					    console.log("Completat: " + progres + "%");
					  } else {
					    console.log("No es pot calcular el progrés");
					  }
}


/*
The only illegal characters are &, < and > (as well as " or ' in attributes).

They're escaped using XML entities, in this case you want &amp; for &.

Metode: https://www.last.fm/api/show/artist.search
Objective: Search for an artist by name. Returns artist matches sorted by relevance.

Params
limit (Optional) : The number of results to fetch per page. Defaults to 30.
page (Optional) : The page number to fetch. Defaults to first page.
artist (Required) : The artist name
api_key (Required) : A Last.fm API key.

Exemple use params optional: http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=27ec60ec0e2abdbea320f9f93394e807&format=json&limit=10&page=2
Agafa dos pagines de 10 entrades cadascuna, un total de 20 ( 0...19)

Exmaple response in XML:
<results for="cher" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">
  <opensearch:Query role="request" searchTerms="cher" startPage="1"/>
  <opensearch:totalResults>386</opensearch:totalResults>
  <opensearch:startIndex>0</opensearch:startIndex>
  <opensearch:itemsPerPage>20</opensearch:itemsPerPage>
  <artistmatches>
    <artist>
      <name>Cher</name>
      <mbid>bfcc6d75-a6a5-4bc6-8282-47aec8531818</mbid>
      <url>www.last.fm/music/Cher</url>
      <image_small>http://userserve-ak.last.fm/serve/50/342437.jpg</image_small>
      <image>http://userserve-ak.last.fm/serve/160/342437.jpg</image>
      <streamable>1</streamable>
    </artist>
	...
  </artistmatches>
</results>

NOTE SEEMS ONLY WORKS IN JSON FORMAT:
http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=27ec60ec0e2abdbea320f9f93394e807&format=json
THIS DOESNT WORK...http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=27ec60ec0e2abdbea320f9f93394e807

{
  "results": {
    "opensearch:Query": {
      "#text": "",
      "role": "request",
      "searchTerms": "sanz",
      "startPage": "1"
    },
    "opensearch:totalResults": "8171",
    "opensearch:startIndex": "0",
    "opensearch:itemsPerPage": "10",
    "artistmatches": {
      "artist": [
        {
          "name": "Alejandro Sanz",
          "listeners": "344758",
          "mbid": "9bacf78f-9132-43da-8873-8a9eb49da0e9",
          "url": "https://www.last.fm/music/Alejandro+Sanz",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/e5dc14a74e694b60ba6c32f748331749.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/e5dc14a74e694b60ba6c32f748331749.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/e5dc14a74e694b60ba6c32f748331749.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/e5dc14a74e694b60ba6c32f748331749.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/e5dc14a74e694b60ba6c32f748331749.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Gaspar Sanz",
          "listeners": "7735",
          "mbid": "e1975032-7d64-417c-80c8-c9b7e95c3e07",
          "url": "https://www.last.fm/music/Gaspar+Sanz",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/5d8e2effdbe94fb0a8e7db92ff305989.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/5d8e2effdbe94fb0a8e7db92ff305989.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/5d8e2effdbe94fb0a8e7db92ff305989.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/5d8e2effdbe94fb0a8e7db92ff305989.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/5d8e2effdbe94fb0a8e7db92ff305989.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Stanza",
          "listeners": "9265",
          "mbid": "df9e5910-f834-403f-b4d8-31dff2954378",
          "url": "https://www.last.fm/music/Stanza",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/5785557488a84487b6ff221902480259.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/5785557488a84487b6ff221902480259.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/5785557488a84487b6ff221902480259.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/5785557488a84487b6ff221902480259.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/5785557488a84487b6ff221902480259.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "sanzu",
          "listeners": "3483",
          "mbid": "",
          "url": "https://www.last.fm/music/sanzu",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/5df53391adf6703037ad3f9f2cd13f49.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/5df53391adf6703037ad3f9f2cd13f49.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/5df53391adf6703037ad3f9f2cd13f49.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/5df53391adf6703037ad3f9f2cd13f49.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/5df53391adf6703037ad3f9f2cd13f49.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "alejandro sanz & alicia keys",
          "listeners": "4463",
          "mbid": "9bacf78f-9132-43da-8873-8a9eb49da0e9",
          "url": "https://www.last.fm/music/alejandro+sanz+&+alicia+keys",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/d9f59281001e4535896ffbf2947138c5.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/d9f59281001e4535896ffbf2947138c5.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/d9f59281001e4535896ffbf2947138c5.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/d9f59281001e4535896ffbf2947138c5.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/d9f59281001e4535896ffbf2947138c5.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Shakira & Alejandro Sanz",
          "listeners": "9188",
          "mbid": "bf24ca37-25f4-4e34-9aec-460b94364cfc",
          "url": "https://www.last.fm/music/Shakira+&+Alejandro+Sanz",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/bb4ddc43141c4702a1db1c9cf5174e27.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/bb4ddc43141c4702a1db1c9cf5174e27.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/bb4ddc43141c4702a1db1c9cf5174e27.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/bb4ddc43141c4702a1db1c9cf5174e27.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/bb4ddc43141c4702a1db1c9cf5174e27.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Noa Sainz",
          "listeners": "2357",
          "mbid": "",
          "url": "https://www.last.fm/music/Noa+Sainz",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/34394657023298346bff5cc081a1cb13.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/34394657023298346bff5cc081a1cb13.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/34394657023298346bff5cc081a1cb13.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/34394657023298346bff5cc081a1cb13.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/34394657023298346bff5cc081a1cb13.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Alejandro Sanz feat. Alicia Keys",
          "listeners": "2499",
          "mbid": "9bacf78f-9132-43da-8873-8a9eb49da0e9",
          "url": "https://www.last.fm/music/Alejandro+Sanz+feat.+Alicia+Keys",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/ddfef7a7b67c4b4cb189cb145d2ca604.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/ddfef7a7b67c4b4cb189cb145d2ca604.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/ddfef7a7b67c4b4cb189cb145d2ca604.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/ddfef7a7b67c4b4cb189cb145d2ca604.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/ddfef7a7b67c4b4cb189cb145d2ca604.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Seanzy",
          "listeners": "1996",
          "mbid": "",
          "url": "https://www.last.fm/music/Seanzy",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/d31cc56b100c950dc5dfbe629efdd45d.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/d31cc56b100c950dc5dfbe629efdd45d.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/d31cc56b100c950dc5dfbe629efdd45d.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/d31cc56b100c950dc5dfbe629efdd45d.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/d31cc56b100c950dc5dfbe629efdd45d.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Mando Saenz",
          "listeners": "1959",
          "mbid": "832cb293-2005-4f5c-9b91-2093fd3476ff",
          "url": "https://www.last.fm/music/Mando+Saenz",
          "streamable": "0",
          "image": [
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/34s/17d48a0bbf694104b81597457acff99a.png",
              "size": "small"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/64s/17d48a0bbf694104b81597457acff99a.png",
              "size": "medium"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/174s/17d48a0bbf694104b81597457acff99a.png",
              "size": "large"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/17d48a0bbf694104b81597457acff99a.png",
              "size": "extralarge"
            },
            {
              "#text": "https://lastfm-img2.akamaized.net/i/u/300x300/17d48a0bbf694104b81597457acff99a.png",
              "size": "mega"
            }
          ]
        }
      ]
    },
    "@attr": {
      "for": "sanz"
    }
  }
}
*/
function loadSearchArtistJSONDoc() {
  var stringquery="eminem";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      processarResposta(this.responseText);
    }
  };
  //Has to change sanz to whatever, and limit opcional, also the page to get ( dont necessary)...
  var url =  "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=eminem&api_key="+API_KEY+"&limit=10&format=json";
  xhttp.open("GET", url, true);
  xhttp.overrideMimeType('text/plain');
  xhttp.send();
}

function processarResposta(dades) {
  var	myObj = JSON.parse(dades);
  var llista = document.createElement('ul');
  var txt,x="";
  txt +="<h1> Search result for artist:" + myObj.results["@attr"].for; // Com no pot ser fico myObj.results.@attr.for
  txt +="<h1> Search result for artist</h1>";
  txt += "<table border='1'>";
  txt += "<tr><th>Nom</th><th>URL</th><th>Imatge</th></tr>";
  console.log("Cantidad de artistas:" + myObj.results.artistmatches.artist.length);
  for (var i=0; i< 10;i++) {
      txt += "<tr><td>" + myObj.results.artistmatches.artist[i].name + "</td><td>"+ myObj.results.artistmatches.artist[i].url + "</td><td><img src="+ myObj.results.artistmatches.artist[i].image[2]["#text"] +"/></td></tr>";
      }
/*
  for (x in myObj) {
      txt += "<tr><td>" + myObj[x].artists.artist.name + "</td></tr>";
    }*/
  txt += "</table>";
  document.getElementById("artist").innerHTML = txt;
}


function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Data</th><th>Value</th><th>Altre</th></tr>";
  var x = xmlDoc.getElementsByTagName("user");
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("playcount")[0].childNodes[0].nodeValue +
    "</td><td><img src="+
    x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue +
   "></img></td></tr>";
   console.log(x[i]);
  }
  document.getElementById("demo2").innerHTML = table;
}

/*
The only illegal characters are &, < and > (as well as " or ' in attributes).

They're escaped using XML entities, in this case you want &amp; for &.

Metode: https://www.last.fm/api/show/track.addTags
Objective:  Tag an album using a list of user supplied tags.

Params
artist (Required) : The artist name
track (Required) : The track name
tags (Required) : A comma delimited list of user supplied tags to apply to this track. Accepts a maximum of 10 tags.
api_key (Required) : A Last.fm API key.
api_sig (Required) : A Last.fm method signature. See authentication for more information.
sk (Required) : A session key generated by authenticating a user via the authentication protocol.

Auth
This service requires authentication. Please see our authentication how-to.
This is a write service and must be accessed with an HTTP POST request.
All parameters should be sent in the POST body, including the 'method' parameter. See rest requests for more information.

Sample Response
<lfm status="ok">
</lfm>

Error in json:
{
  "error": 10,
  "message": "Invalid API key - You must be granted a valid key by last.fm"
}

Error in xml
<lfm status="failed">
    <error code="10">Invalid API key - You must be granted a valid key by last.fm</error>
</lfm>
*/

function addTrackTag()
{
  if (sessionStorage.getItem("mySessionKey") == null)
  {
    console.log("Error no estas authenticat");
  }
  else {
    //Estas loguejat i autenticat de forma correcta--
          var tag1="Relax";
          var tag2="Intense";
        //O be aixi i despres utilitzem una funcio per convertir-lo en string ( convertirenParametresDades del ioc)
        var dades = {
          method: "track.addTags",
          artist : "Muse",
          track : "Take a Bow",
          //A comma delimited list of user supplied tags to apply to this track. Accepts a maximum of 10 tags.
          tags : [tag1, tag2],
          api_key : API_KEY,
          api_sig : sessionStorage.getItem("myApiSig"),
          sk : sessionStorage.getItem("mySessionKey"),
          format:"json"
          };
        /*
        httpRequest.open("POST", url,true);
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var params=concertirEnParametres(dades);
        httpRequest.send(params);
        */
        var last_url="http://ws.audioscrobbler.com/2.0/";
        var xhr = new XMLHttpRequest();

        xhr.open("POST", last_url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              processarRespostaAddTag(xhr);
            }
        }
        var data = JSON.stringify(dades);
        xhr.send(data);
        /*
            $.ajax({
              type: "POST", //both are same, in new version of jQuery type renamed to method
              url: last_url,
              data: JSON.stringify(dades),
              dataType: 'xml', //datatype especifica el tipus de dada que s'espera rebre del servidor
              success: function(res){
                  processarRespostaAddTag(res);
              },
              error : function(){
                  console.log("Error en addTag to track" + dades.track + "de l'artista" + dades.artist);
                  document.getElementById("demo2").innerHTML = "<h2>Failure</h2>";
              }
             });
*/
             function processarRespostaAddTag(xml) {
               var i;
               var xmlDoc = xml.responseXML;
               x = xmlDoc.getElementsByTagName('lfm');
               txt = x.getAttribute("status");
               if( txt == "ok")
               {
                 document.getElementById("demo2").innerHTML = "<h2>Added Tag Correct</h2>";
               }
               else document.getElementById("demo2").innerHTML = "<h2>Failure</h2>";
             }
        }
    }

    /*
    The only illegal characters are &, < and > (as well as " or ' in attributes).

    They're escaped using XML entities, in this case you want &amp; for &.

    Metode: https://www.last.fm/api/show/track.love
    Objective:  Love a track for a user profile.

    Params
    track (Required) : A track name (utf8 encoded)
    artist (Required) : An artist name (utf8 encoded)
    api_key (Required) : A Last.fm API key.
    api_sig (Required) : A Last.fm method signature. See authentication for more information.
    sk (Required) : A session key generated by authenticating a user via the authentication protocol.

    Auth
    This service requires authentication. Please see our authentication how-to.
    This is a write service and must be accessed with an HTTP POST request.
    All parameters should be sent in the POST body, including the 'method' parameter. See rest requests for more information.

    Sample Response
    <lfm status="ok">
    </lfm>

    Error in json:
    {
      "error": 10,
      "message": "Invalid API key - You must be granted a valid key by last.fm"
    }

    Error in xml
    <lfm status="failed">
        <error code="10">Invalid API key - You must be granted a valid key by last.fm</error>
    </lfm>
    */

    function trackLove()
    {
      if (sessionStorage.getItem("mySessionKey") == null)
      {
        console.log("Error no estas authenticat");
      }
      else {
        //Estas loguejat i autenticat de forma correcta--
          //O be aixi i despres utilitzem una funcio per convertir-lo en string ( convertirenParametresDades del ioc)
            var dades = {
              method: "track.love",
              artist : "Muse",
              track : "Take a Bow",
              api_key : API_KEY,
              api_sig : sessionStorage.getItem("myApiSig"),
              sk : sessionStorage.getItem("mySessionKey"),
              format:"json"
              };
            /*
            httpRequest.open("POST", url,true);
            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var params=concertirEnParametres(dades);
            httpRequest.send(params);
            */
            var last_url="http://ws.audioscrobbler.com/2.0/";
            var xhr = new XMLHttpRequest();

            xhr.open("POST", last_url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  processarRespostaLoveTrack(xhr);
                  //processarRespostaLoveTrack(this); //seria equivalent, faltaria gestionar errors
                }
            }
            var data = JSON.stringify(dades);
            xhr.send(data);
            /*
                $.ajax({
                  type: "POST", //both are same, in new version of jQuery type renamed to method
                  url: last_url,
                  data: JSON.stringify(dades),
                  dataType: 'xml', //datatype especifica el tipus de dada que s'espera rebre del servidor
                  success: function(res){
                      processarRespostaAddTag(res);
                  },
                  error : function(){
                      console.log("Error en addTag to track" + dades.track + "de l'artista" + dades.artist);
                      document.getElementById("demo2").innerHTML = "<h2>Failure</h2>";
                  }
                 });
    */
                 function processarRespostaLoveTrack(xml) {
                   var i;
                   var xmlDoc = xml.responseXML;
                   x = xmlDoc.getElementsByTagName('lfm');
                   txt = x.getAttribute("status");
                   if( txt == "ok")
                   {
                     document.getElementById("demo2").innerHTML = "<h2>Added Tag Correct</h2>";
                   }
                   else document.getElementById("demo2").innerHTML = "<h2>Failure</h2>";
                 }
            }
        }

/*
Trying to find user default.it doesnt work
*/
function loadDefaultUserInfoXMLDoc() {
  var stringquery="sanz";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&api_key="+API_KEY, true);
  xhttp.send();
}

function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Data</th><th>Value</th><th>Altre</th></tr>";
  var x = xmlDoc.getElementsByTagName("user");
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("playcount")[0].childNodes[0].nodeValue +
    "</td><td><img src="+
    x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue +
   "></img></td></tr>";
   console.log(x[i]);
  }
  document.getElementById("demo2").innerHTML = table;
}








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





/*
getsimilar
/2.0/?method=artist.getsimilar&artist=cher&api_key=YOUR_API_KEY&format=json*/
