define(["jquery",
 		"handlebars",
 		"js/pagesWidget",
 		"js/elementsWidget",
 		"js/navWidget",
 		"js/imageWidget",
 		"js/textAreaWidget",	
 		"js/settingsWidget",	
 		"js/RestClientHelper",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pagesWidget, elementsWidget, navWidget, imageWidget, textAreaWidget, settingsWidget, RestClient, pageTemplate){
		var pages=[],
		onAdd = function(page){
			RestClient.sendRequest('POST',
			 'http://localhost:8080/TrialProject/api/pages',
			  "id=" + page.id + "&pageName=" + page.pageName + "&html=" + page.html);

			pages.push(page);
			elementsWidget.update(pages);

		},
		onUpdate = function(page){

			var updatedPageIndex = _.findIndex(pages, function(p){return p.id === page.id;});
			pages[updatedPageIndex] = page;

  			elementsWidget.update(pages);
			RestClient.sendRequest('POST',
			 'http://localhost:8080/TrialProject/api/pages',
			  "id=" + page.id + "&pageName=" + page.pageName + "&html="+ page.html);


		},
		onRemove = function(pageId){
			pages = _.filter(pages, function(p){return p.id !== pageId;});

			//Cross domain REST calls make DELETE method hard for some reason... made this instead

			RestClient.sendRequest('POST', 'http://localhost:8080/TrialProject/api/page/delete', "id=" + pageId);

			elementsWidget.update(pages);

		},
		onloadCallback = function(xhr, data){
			pages = JSON.parse(xhr.responseText);
			if(pages.length ==0){
				pages = [{pageName:"PAGE", id:1, html:'<div class="nav-container"><span class="nav-span selected-nav">PAGE</span></div><div class="image-container dz-clickable"><div><div class="add-image-image center"><img src="resources/Sprites/Image-Placeholder@2x.png"></div><div class="add-image-label center"><span>ADD IMAGE   +</span></div></div></div><div class="title" contenteditable="true"><h1>Add Title Here</h1></div></div>'}];
			}

			var mainPage = handlebars.compile(pageTemplate);
			$('body').append(mainPage());

			pagesWidget.create($('.editBar'), pages, onAdd , onUpdate, onRemove);

			elementsWidget.create($('.editBar'), pages, onUpdate);
			settingsWidget.create($('.editBar'));


			//Create First Page 
			navWidget.create($(".page-container"), pages);
			
			imageWidget.create($(".page-container"));

			
			$(".page-container").append(pages[0].html);

			activateWidgets();
		},
		activateWidgets = function(){
			textAreaWidget.activate($(".page-container"), elementsWidget.elementsHaveChanged);

			_.forEach($(".title"), function(el){
				$(el).get(0).addEventListener("input", function(e) {
							   elementsWidget.elementsHaveChanged();
							}, false);
			});

			//Remove stale nav and image-container at top.
			$($(".nav-container")[1]).remove();
			$($(".image-container")[1]).remove();
		}
//		RestClient.sendRequest('GET', 'http://localhost:8080/TrialProject/api/pages', undefined, onloadCallback);
        onloadCallback({responseText:"[]"},{});

});