define(["jquery",
 		"handlebars",
 		"js/pagesWidget",
 		"js/elementsWidget",
 		"js/navWidget",
 		"js/imageWidget",		
 		"js/RestClientHelper",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pagesWidget, elementsWidget, navWidget, imageWidget, RestClient, pageTemplate){
		var pages=[],
		onAdd = function(page){
			RestClient.sendRequest('POST', 'http://localhost:8080/WeeblyTrialProject/api/pages', "id=" + page.id + "&pageName=" + page.pageName + "&html=");

			pages.push(page);
			elementsWidget.update(pages);

		},
		onUpdate = function(page){

			RestClient.sendRequest('POST', 'http://localhost:8080/WeeblyTrialProject/api/pages', "id=" + page.id + "&pageName=" + page.pageName + "&html=");
;			elementsWidget.update(pages);

		},
		onRemove = function(pageId){
			pages = _.filter(pages, function(p){return p.id !== pageId;});

			//Cross domain REST calls make DELETE method hard for some reason... made this instead

			RestClient.sendRequest('POST', 'http://localhost:8080/WeeblyTrialProject/api/page/delete', "id=" + pageId);

			elementsWidget.update(pages);

		},
		onloadCallback = function(xhr, data){
			pages = JSON.parse(xhr.responseText);
			if(pages.length ==0){
				pages = [{pageName:"PAGE", id:1}];
			}

			var mainPage = handlebars.compile(pageTemplate);
			$('body').append(mainPage());

			pagesWidget.create($('.editBar'), pages, onAdd , onUpdate, onRemove);

			elementsWidget.create($('.editBar'), pages);

			//Create First Page 
			navWidget.create($(".page-container"), pages);
			imageWidget.create($(".page-container"));
			$(".page-container").append("<div class='title' contenteditable='true'><h1>Add Title Here</h1></div>");
		}
		RestClient.sendRequest('GET', 'http://localhost:8080/WeeblyTrialProject/api/pages', undefined, onloadCallback);

});