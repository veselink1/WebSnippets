/*The main function responsible for the previewing
the code and functionality of a snippets*/

//Fetch the elements
var url = document.URL;
var grid = document.getElementsByClassName("grid")[0];
var embed = document.getElementById("previewFrame");
var codeTxt = document.getElementById("codeTxt");
var para = grid.getElementsByTagName("p")[0];
var codeNode;
var source = url.split("?");
var code;
if (source[1]){
source = source[1];
embed.src = source;
embed.className = "showME" ;

//Fetch the code of the requested page
function initializePages(){
	var txthttp;
	txthttp=new XMLHttpRequest();
	txthttp.onreadystatechange=function()
	  {
	  if (txthttp.readyState==4 && txthttp.status==200)
	    {
		codeNode = txthttp.responseText;
		codeTxt.className = "showME" ;
		codeTxt.innerHTML = codeNode;
	    }
	  }
	txthttp.open("GET", source,true);
	txthttp.send();
}
}
else {
	para.className = "blockME";
}

//Call script at start
initializePages();

//Setup Fullscreen

function codeFullscreen()
{
	if (codeTxt.requestFullscreen) {
	  codeTxt.requestFullscreen();
	} else if (codeTxt.msRequestFullscreen) {
	  codeTxt.msRequestFullscreen();
	} else if (codeTxt.mozRequestFullScreen) {
	  codeTxt.mozRequestFullScreen();
	} else if (codeTxt.webkitRequestFullscreen) {
	  codeTxt.webkitRequestFullscreen();
	}
}

document.getElementById("fullscreener").addEventListener("click", function(){codeFullscreen()});