var iniFeed = idTitleRss+1;var nocity1=0;var nocity2=0;var timer1;var timer2;var xmlFeed = new XMLHttpRequest();var postal;var demoMode = false;var enabled;var xmlReq = new XMLHttpRequest();var launchReq = new XMLHttpRequest();var secleft=0;var newleft=0;var myScroll;var myRss;var newright=0;

if (location.href.indexOf("Wallpaper")  == -1){stylesheet = stylesheetLock;iconSet = iconSetLock;iconExt = iconExtLock;enabled = enableLockScreen;}else{stylesheet = stylesheetWall;iconSet = iconSetWall;iconExt = iconExtWall;enabled = enableWallpaper;}

if(enabled == true){if(iconSet == null || iconSet == 'null' || iconSet == ""){var iconSet = stylesheet;}
var headID = document.getElementsByTagName("head")[0];var styleNode = document.createElement('link');styleNode.type = 'text/css';styleNode.rel = 'stylesheet';styleNode.href = 'Stylesheets/'+stylesheet+'.css';headID.appendChild(styleNode);var scriptNode = document.createElement('script');scriptNode.type = 'text/javascript';scriptNode.src = 'Sources/'+source+'.js';headID.appendChild(scriptNode);}

function loaded() {	setTimeout( function() {document.ontouchmove = function(e) { e.preventDefault(); return false; };myScroll = new iScroll( document.getElementById('feedRss') );}, 100);}

function loadedRss() { setTimeout( function() {	document.ontouchmove = function(e) { e.preventDefault(); return false; };myRss = new iScrollRss( document.getElementById('AccordionContainer') );}, 100);}

window.addEventListener('load', loaded, true);
window.addEventListener('load', loadedRss, true);

function calculaRandom(max){var i;if(randomFeed==1){i = Math.ceil(max*Math.random());if(i<=idTitleRss)calculaRandom();}else{i = iniFeed;iniFeed++;}return i;}

function getFeed(){document.getElementById("feedRss").innerHTML = '';var totalFeeds = xmlFeed.responseXML.getElementsByTagName("title").length-idTitleRss;var who=xmlFeed.responseXML.getElementsByTagName("title")[idTitleRss].firstChild.nodeValue.split(" ")[0];var i = calculaRandom(totalFeeds);var j = i-1;var title=xmlFeed.responseXML.getElementsByTagName("title")[i].firstChild.nodeValue;var desc=xmlFeed.responseXML.getElementsByTagName("description")[j].firstChild.nodeValue;desc = desc.split("<img")[0];html = "<p><span style='color:#f8981d'>"+who+" : </span>"+title+".<br />"+desc+"</p>";document.getElementById("feedRss").innerHTML = html;}

function onLoad(){update();updateFeed();if (enabled == true){if (demoMode == true){document.getElementById("weatherIcon").src="Icon Sets/"+iconSet+"/"+"cloudy1"+iconExt;document.getElementById("weatherIcon2").src="Icon Sets/"+iconSet+"/"+"cloudy1"+iconExt;document.getElementById("city").innerText="Somewhere";document.getElementById("desc").innerText="Partly Cloudy";document.getElementById("temp").innerText="100บ";document.getElementById("forecast").innerText="Sun";if(numLoc==2){document.getElementById("city2").innerText="Somewhere";
document.getElementById("desc2").innerText="Partly Cloudy";document.getElementById("temp2").innerText="100บ";document.getElementById("forecast2").innerText="Sun";}}else{document.getElementById("weatherIcon").src="Icon Sets/"+iconSet+"/"+"dunno"+iconExt;timer1 = setTimeout('validateWeatherLocation(escape(locale).replace(/^%u/g, "%"), setPostal,"1")', 300);if(numLoc==2){document.getElementById("weatherIcon2").src="Icon Sets/"+iconSet+"/"+"dunno"+iconExt;timer2 = setTimeout('validateWeatherLocation(escape(locale2).replace(/^%u/g, "%"), setPostal,"2")', 300);}}}else{document.getElementsByTagName("body")[0].innerText='';}}

function convertTemp(num){if (isCelsius == true)return Math.round ((num - 32) * 5 / 9);else{return num;}}
function setPostal(obj,id){if (obj.error == false){if(obj.cities.length > 0){postal = escape(obj.cities[0].zip).replace(/^%u/g, "%");document.getElementById("WeatherContainer").className = "";fetchWeatherData(dealWithWeather,postal,'1');if(numLoc==2) fetchWeatherData(dealWithWeather,postal,'2');}else{if(id=='1') document.getElementById("city").innerText="errorLocaleNotFound";if(id=='2' && numLoc==2) document.getElementById("city2").innerText="errorLocaleNotFound";document.getElementById("WeatherContainer").className = "errorLocaleNotFound";}}else{if(id=='1') document.getElementById("city").innerText=obj.errorString;if(id=='2' && numLoc==2) document.getElementById("city2").innerText=obj.errorString;document.getElementById("WeatherContainer").className = "error";}}

function dealWithWeather(obj,id){if (obj.error == false){if(locale.split(",")[0]==obj.city){nocity1=1;nocity2=0;}if(locale2.split(",")[0]==obj.city){nocity1=0;nocity2=1;}if(useRealFeel == true)	tempValue = convertTemp(obj.realFeel);else tempValue = convertTemp(obj.temp);if(id=='1' && nocity1==1 && nocity2==0){document.getElementById("desc").innerText=obj.description.toLowerCase();document.getElementById("city").innerText=obj.city +" "+tempValue+"ยบ";document.getElementById("weatherIcon").src="Icon Sets/"+iconSet+"/"+MiniIcons[obj.icon]+iconExt;clearTimeout(timer1);}if(id=='2' && numLoc==2 && nocity1==0 && nocity2==1){document.getElementById("desc2").innerText=obj.description.toLowerCase();document.getElementById("city2").innerText=obj.city +"   "+tempValue+"ยบ";
document.getElementById("weatherIcon2").src="Icon Sets/"+iconSet+"/"+MiniIcons[obj.icon]+iconExt;clearTimeout(timer2);}document.getElementById("WeatherContainer").className = "";}else{document.getElementById("WeatherContainer").className = "error";}nocity1=0;nocity2=0;}

var wannaBlink=1; //If you dont want to blink put this to 0
function showElements(){if(xmlReq.responseXML!=null){var nsms=xmlReq.responseXML.getElementsByTagName("SMS")[0].firstChild.nodeValue;var ncall=xmlReq.responseXML.getElementsByTagName("Call")[0].firstChild.nodeValue;var nmail=xmlReq.responseXML.getElementsByTagName("Mail")[0].firstChild.nodeValue;if(nsms>0 && wannaBlink==1) document.getElementById("SMSIcon").innerHTML = "<img src='imgs/sms.gif' />" + nsms +" "+ Msms;else document.getElementById("SMSIcon").innerHTML = "<img src='imgs/sms.png' />" + nsms +" "+ Msms;if(ncall>0 && wannaBlink==1) document.getElementById("CallIcon").innerHTML = "<img src='imgs/call.gif' />" + ncall +" "+ Mcall;else document.getElementById("CallIcon").innerHTML = "<img src='imgs/call.png' />" + ncall +" "+ Mcall;if(nmail>0 && wannaBlink==1) document.getElementById("MailIcon").innerHTML = "<img src='imgs/mail.gif' />" + nmail +" "+Mmail;else document.getElementById("MailIcon").innerHTML = "<img src='imgs/mail.png' />" + nmail +" "+Mmail;}else setTimeout('showElements()',300);}

function hideElement(){document.getElementById("SilentIcon").style.display='none';document.getElementById("CalendarIcon").style.display='none';document.getElementById("MMSIcon").style.display='none';document.getElementById("IMIcon").style.display='none';document.getElementById("RSSIcon").style.display='none';}

function updateIcon(){hideElement();showElements();}

function processXml(){if (xmlReq.readyState != 4) return;if (xmlReq.status != 200 && xmlReq.status != 0) return;updateIcon();}

function colocaFeed(){secleft+=1.4;var postersDiv = document.getElementById("feedRssOver");var postersDivIm = document.getElementById("feedRssOverIm");if(secleft<=10){postersDiv.style.opacity = secleft/10;postersDivIm.style.opacity = secleft/10;setTimeout('colocaFeed()',30);}else secleft=0;}

function moverFeed(){var postersDiv = document.getElementById("feedRssOver");var postersDivIm = document.getElementById("feedRssOverIm");if(newleft>-280){newleft -= 70;postersDiv.style.left = newleft;postersDivIm.style.left = newleft;setTimeout('moverFeed()',40);	}else{postersDiv.style.display='none';postersDivIm.style.display='none';postersDiv.style.left=7+'px';postersDivIm.style.left=7+'px';getFeed();postersDiv.style.display='inline';postersDivIm.style.display='inline';colocaFeed();newleft=0;}}

function moverFeedR(){var postersDiv = document.getElementById("feedRssOver");var postersDivIm = document.getElementById("feedRssOverIm");if(newright<320){newright += 70;postersDiv.style.left = newright;	postersDivIm.style.left = newright;	setTimeout('moverFeedR()',40);}else{postersDiv.style.display='none';postersDivIm.style.display='none';postersDiv.style.left=7+'px';	postersDivIm.style.left=7+'px';	getFeed();postersDiv.style.display='inline';postersDivIm.style.display='inline';colocaFeed();newright=0;}}

function processXml2(){if (xmlFeed.readyState != 4)	return;if (xmlFeed.status != 200 && xmlFeed.status != 0)return;else getFeed();}

function update(){xmlReq.onreadystatechange = processXml;xmlReq.timeout = 2000;xmlReq.open("GET", "http://127.0.0.1:16322/status", true);xmlReq.send();}

function updateFeed(){xmlFeed.onreadystatechange = processXml2;xmlFeed.timeout = 1200000;xmlFeed.open("GET", feed, true);xmlFeed.send();}