define(["jquery",
 		"handlebars",
 		"js/pagesWidget",
 		"js/elementsWidget",
 		"js/navWidget",
 		"js/imageWidget",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pagesWidget, elementsWidget, navWidget, imageWidget, pageTemplate){
		var pages=[];
		var onAdd = function(page){

			var xhr = createCORSRequest('POST', 'http://localhost:8080/WeeblyTrialProject/api/pages');
			if (!xhr) {
			  throw new Error('CORS not supported');
			}

			xhr.onload = function(){
				
			}
			xhr.send(page);
			pages.push(page);
			elementsWidget.update(pages);

		};

		var onRemove = function(pageId){
			pages = _.filter(pages, function(p){return p.id !== pageId;});
			var xhr = createCORSRequest('DELETE', 'http://localhost:8080/WeeblyTrialProject/api/page/' + pageId);
			if (!xhr) {
			  throw new Error('CORS not supported');
			}

			xhr.setRequestHeader("Content-Type","application/json");

			xhr.onload = function(){
			}
			xhr.send();


			elementsWidget.update(pages);
		};	

		var createCORSRequest = function (method, url) {
			  var xhr = new XMLHttpRequest();
			  if ("withCredentials" in xhr) {

				    // Check if the XMLHttpRequest object has a "withCredentials" property.
				    // "withCredentials" only exists on XMLHTTPRequest2 objects.
				    xhr.open(method, url, true);

			  } else if (typeof XDomainRequest != "undefined") {

				    // Otherwise, check if XDomainRequest.
				    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
				    xhr = new XDomainRequest();
				    xhr.open(method, url);

			  } else {

				    // Otherwise, CORS is not supported by the browser.
				    xhr = null;

			  }
			  return xhr;
		}

		var xhr = createCORSRequest('GET', 'http://localhost:8080/WeeblyTrialProject/api/pages');
		if (!xhr) {
		  throw new Error('CORS not supported');
		}


		xhr.onload = function(){
			pages = JSON.parse(xhr.responseText);
			if(pages.length ==0){
				pages = [{pageName:"PAGE", id:1}];
			}
		


			var mainPage = handlebars.compile(pageTemplate);
			$('body').append(mainPage());


			pagesWidget.create($('.editBar'), pages, onAdd ,onRemove);
			elementsWidget.create($('.editBar'), pages);

			//Create First Page 
			navWidget.create($(".page-container"), pages);
			imageWidget.create($(".page-container"));
			$(".page-container").append("<div class='title' contenteditable='true'><h1>Add Title Here</h1></div>");
		};
		xhr.send();

});