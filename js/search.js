/*Search box function */

//Fetch the elements
var searchBox = document.getElementById("searchBox");
var searchResult = document.getElementById("searchResult");
var match;
var matchPages = new Array();
var page;
var snPage;
var link;
var linkText;
var br = document.createElement("br"); //New line tag
var div = document.createElement("div"); //Search results - element
var results; //Search results - text

//Main search function
function searchPages(text){
	if (searchBox.value.length > 2) {
		results = 0;
		for (var i = pages.length - 1; i >= 0; i--) {
			snPage = pages[i];
			snPage = snPage.split("=");
			if (snPage[0].toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1 && searchResult.innerHTML.indexOf(snPage[0]) < 0 ) {
			link = document.createElement("a");
			linkText = document.createTextNode(snPage[0]);
			link.appendChild(linkText);
			snPage[1] = snPage[1].substr(1,snPage[1].length-1);
			link.href = "preview/index.html?" + snPage[1]; //Set link location
			searchResult.appendChild(br);
			searchResult.appendChild(div);
			searchResult.appendChild(link); 
			showSearch();
			results++;
		}}
		
		if (results==0 && pagesTxt.toLowerCase().indexOf(searchBox.value.toLowerCase()) < 0) {
			hideEmptySearch();
			}
		
	}
	
	else {
		hideSearch();
	}
}

//Hide the search results box
function hideSearch(delay) {
	setTimeout(function(){
			searchResult.className = null;
		}, delay);
}

//Hide and empty the search box
function hideEmptySearch(){
	hideSearch(0);
	setTimeout(function(){
			emptySearch();
		}, 200);
}

//Just empty search
function emptySearch(){
	searchResult.innerHTML = null;
}

//Show the search results
function showSearch(){
	searchResult.className = "visible";
}

//Event listeners
searchBox.addEventListener("input", function(){searchPages(searchBox.value)});
searchBox.addEventListener("blur", function(){hideSearch(301)});
searchBox.addEventListener("click", function(){showSearch()});
searchBox.addEventListener("dblclick", function(){hideEmptySearch(); searchBox.value = null;});