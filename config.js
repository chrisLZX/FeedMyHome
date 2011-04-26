//Don't forget to download StatusNotifier from cydia in order to have active the sms, mail and missed calls alerts

//if you want temperature in Farenheit instead of Celsius put this to false
var isCelsius=true;

//Choose language es=spain | ca=catalan | en=english if another lang wanted just translate one of this
var idioma;
idioma='es';
//idioma='en';
//idioma='ca';
var Msms;
var Mmail;
var Mcall
switch(idioma){
	case 'es':
		Msms='Nuevos SMS';
		Mmail='Nuevos E-Mails';
		Mcall='Llamadas Perdidas';
		break;
	case 'en':
		Msms='New Text Messages';
		Mmail='New E-Mails';
		Mcall='Missed Calls';
		break;
	case 'ca':
		Msms='Nous Missatges';
		Mmail='Nous E-Mails';
		Mcall='Trucades perdudes';
		break;
}

//Number of cities to display 1 or 2
var numLoc=2;
var locale = 'barcelona, spain';
var locale2 = 'tarragona, spain';

//Reading Rss in order or random. order=0 | random=1
var randomFeed=1;


//idFeed = choose feed number. Will read only one of these.
// 1 elPais.com
// 2 iphoneros.com
// 3 meneame.net
var idFeed = 1;
switch(idFeed){
	case 1:
		feed = 'http://www.elpais.com/rss/feed.html?feedId=1022';
		idTitleRss=1; //this the position of Rss's title into xml
		break;
	case 2:
		feed = 'http://feeds.feedburner.com/iphoneros?format=xml';
		idTitleRss=0; //this the position of Rss's title into xml
		break;
	case 3:
		feed = 'http://feeds.feedburner.com/MeneamePublicadas?format=xml';
		idTitleRss=0; //this the position of Rss's title into xml
		break;
}