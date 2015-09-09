define(["jquery",
 		"handlebars",
 		"js/pagesWidget",
 		"js/elementsWidget",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pagesWidget, elementsWidget, pageTemplate){
		var pages=[];
		var onAdd = function(page){
			pages.push(page);
			elementsWidget.update(pages);
		};

		var onRemove = function(pageId){
			pages = _.filter(pages, function(p){return p.id !== pageId;});
			elementsWidget.update(pages);
		};

		var mainPage = handlebars.compile(pageTemplate);
		$('body').append(mainPage());
		pagesWidget.create($('.editBar'), onAdd ,onRemove);
		elementsWidget.create($('.editBar'), pages);

		

});