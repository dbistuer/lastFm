var data = {
    'token':sessionStorage.getItem('token'),
    'api_key': API_KEY
};

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

function processarRespostaUserInfo(xml) {
  var table="<tr><th>Data</th><th>Nom d'usuari</th><th>Nom</th><th>Url</th><th>Pais</th><th>Edat</th><th>Genere</th><th>Value</th><th>Altre</th></tr>";
    table += "<tr><td>" +
    xml.getElementsByTagName("registered")[0].innerHTML +
    "</td><td>" +
    xml.getElementsByTagName("name")[0].innerHTML +
    "</td><td>" +
    xml.getElementsByTagName("realname")[0].innerHTML +
    "</td><td><a href='" +
    xml.getElementsByTagName("url")[0].innerHTML +
    "'>"+xml.getElementsByTagName("url")[0].innerHTML+"</a></td><td>" +
    xml.getElementsByTagName("country")[0].innerHTML +
    "</td><td>" +
    xml.getElementsByTagName("age")[0].innerHTML +
    "</td><td>" +
    xml.getElementsByTagName("gender")[0].innerHTML +
    "</td><td>" +
    xml.getElementsByTagName("playcount")[0].innerHTML;
    if(xml.getElementsByTagName("image")[2].innerHTML == ""){
      table+= "</td><td><img src="+
      "'img/noIMG.jpg'></img></td></tr>";
    }else{
      table+= "</td><td><img src="+
      xml.getElementsByTagName("image")[2].innerHTML +
     "></img></td></tr>";
    }
  document.getElementById("dadesUsuari").innerHTML = table;
}

function getUserinfo(){
  var last_url="http://ws.audioscrobbler.com/2.0/?";
  $.ajax({
    type: "GET",
    url: last_url,
    data : 'method=user.getinfo'+
            '&user='+sessionStorage.getItem('mySessionUser')+
            '&api_key='+API_KEY,

    //data: post_data,
    dataType: 'xml',
    //"success" gets called when the returned code is a "200" (successfull request). "error" gets called whenever another code is returned (e.g. 404, 500).
    success: function(res){
        //No caldria aquesta instrucció perque ja guaredem els que ens convé en sessionStorage
        //var	myresposta = JSON.parse(res);
        processarRespostaUserInfo(res);
      },
    error : function(xhr, status, error){
          var errorMessage = xhr.status + ': ' + xhr.statusText
          console.log('Error - ' + errorMessage);
    }
   });
}

function calcularApiStack(){

            data['method']='auth.getSession';
            data['api_sig']=last_fm_calculate_apisig(data);
            sessionStorage.setItem('API_SIG', data['api_sig']);
            console.log("Post data: Token " + sessionStorage.getItem('token') + "ApiKey: "+ API_KEY + "ApiSig: " + data['api_sig']);
            //sessionStorage.setItem("myApiSig",post_data.api_sig );

            var last_url="http://ws.audioscrobbler.com/2.0/?";
            $.ajax({
              type: "GET",
              url: last_url,
              data : 'method=auth.getSession'+
                      '&api_key='+API_KEY+
                     '&token='+sessionStorage.getItem('token')+
                     '&api_sig='+data['api_sig'],
              //data: post_data,
              dataType: 'xml',
              //"success" gets called when the returned code is a "200" (successfull request). "error" gets called whenever another code is returned (e.g. 404, 500).
              success: function(res){
                  //No caldria aquesta instrucció perque ja guaredem els que ens convé en sessionStorage
                  //var	myresposta = JSON.parse(res);
                  console.log("Resposta: Name " + res.getElementsByTagName("name")[0].innerHTML);// Should return session key.
                  console.log("Resposta: Key " + res.getElementsByTagName("key")[0].innerHTML);
                  //store session key for further authenticate operations...
                  sessionStorage.setItem("mySessionUser", res.getElementsByTagName("name")[0].innerHTML);
                  sessionStorage.setItem("sk", res.getElementsByTagName("key")[0].innerHTML);
              },
              error : function(xhr, status, error){
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    console.log('Error - ' + errorMessage);
              }
             });
             //getuserinfo
             getUserinfo();

}
