/*This is the main function which deals
with URL assigning and dynamic link creation*/

//Function for undefining variables
function unset() {return;}

//Main function after body load
var body = document.body;
var nav = document.getElementsByTagName("nav")[0];
var grids = document.getElementsByClassName("grid");
var fGrid;
var sGrid;
var expand = document.getElementById("expand");
if ("ontouchstart" in window || navigator.msMaxTouchPoints){
	expand.addEventListener("touchstart", showMenu);
}
else {
	expand.addEventListener("click", showMenu);
}

//Block drag and drop
window.ondragstart = function() { return false; } 

var cardTitles;
var card;
var onePage;

function mapCards()
{

	cardTitles = document.getElementsByClassName("cardTitle");

	for (var i = cardTitles.length-1; i >= 0; i--) {
		var card = cardTitles[i].parentNode;
		card.onclick = function(){previewMe(this.getElementsByTagName('span')[0])};
	}
}

//Card open functions
function previewMe(aCardTitle){
	for (var i = pages.length - 1; i >= 0; i--) {
		onePage = pages[i];
		onePage = onePage.split("=");
		if (onePage[0].indexOf(aCardTitle.innerHTML)>-1 ) {
		url = onePage[1].substr(1,onePage[1].length-1);
		window.location.href = "/preview/index.html?" + url;
	}
}}

function previewOpen(elem, url){
	elem.addEventListener("click", function() {
	url = url.substr(1,url.length-1);
	window.location.href = "/preview/index.html?" + url;
	});
}

function showMenu(){
	if(nav.className.indexOf("visible") == -1){
		nav.className += " visible";
	}
	else {
		nav.className = nav.className.replace(" visible","");
	}
}

//Grid page switcher
function switchToPage(ind){
	ind--;
	if (fGrid&&fGrid.className.indexOf("first") > -1) {
		fGrid.className=fGrid.className.replace("first", "second");
	}
	fGrid = grids[ind];
	sGrid = document.getElementsByClassName("first")[0] || grids[0];
	sGrid.className = sGrid.className.replace("first", "second");
	fGrid.className+=" first";
	if (fGrid.className.indexOf("second second")>-1) {
		fGrid.className = fGrid.className.replace("second second", "second");
		fGrid.className = fGrid.className.replace("  ", " ");
	}
	if (sGrid.className.indexOf("second second")>-1) {
		sGrid.className = sGrid.className.replace("second second", "second");
		sGrid.className = sGrid.className.replace("  ", " ");
	}
	clearGrids();
	fetchGrid(ind);
}

function clearGrids()
{
	for (var i = 0; i < grids.length; i++) {
		grids[i].innerHTML = "";
	};
}

function fetchGrid(ind)
{
	var gridHTML;
	gridHTML=new XMLHttpRequest();
	gridHTML.onreadystatechange=function()
	  {
	  if (gridHTML.readyState==4 && gridHTML.status==200)
	    {
			grids[ind].innerHTML = gridHTML.responseText;
			mapCards();
	    }
	  }
	gridHTML.open("GET", window.location.href + grids[ind].dataset.contentUrl , true);
	gridHTML.send();
}

//Script for <base> non-compatibility
if(!document.createElement("base"))
	{
		
		var allElements = document.getElementsByTagName("*");
		var sublocationsStr = document.getElementsByTagName("base")[0].getAttribute("href");
		for (var i=0; i < allElements.length; i++) {
			var thisElement = allElements[i];
			if(thisElement.getAttribute("href"))
			{
				thisElement.setAttribute("href", sublocationsStr + thisElement.getAttribute("href"))
			}
			if(thisElement.getAttribute("src"))
			{
				thisElement.setAttribute("src", sublocationsStr + thisElement.getAttribute("src"))
			}
		}

		
	}