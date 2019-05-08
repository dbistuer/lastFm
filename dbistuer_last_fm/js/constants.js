		var myapplication_name="dbistuer_last_fm";
		var API_KEY="27ec60ec0e2abdbea320f9f93394e807";
		var SHARED_SECRET="6fc2c721a8743addf75d378c6ac451cc";
		var callBackUrl = "http://localhost:3000/mainpage.html";

function myLoginFunction(){
			/*
			params api_key ( my api key)
			cb the web that goes when user is authenticated relative path ( depends on the server is launched): http://localhost:3000/mainpage.ht*/
			var url= 'http://www.last.fm/api/auth/?api_key='+API_KEY+'&cb='+callBackUrl;
			sessionStorage.setItem('API_KEY',API_KEY);
			sessionStorage.setItem('SHARED_SECRET',SHARED_SECRET);
			window.location.replace(url);


}
