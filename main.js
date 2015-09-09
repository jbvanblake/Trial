define(["jquery",
 		"handlebars",
 		"js/pagesWidget",
 		"js/elementsWidget",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pagesWidget, elementsWidget, pageTemplate){
		var mainPage = handlebars.compile(pageTemplate);
		$('body').append(mainPage());
		pagesWidget.create($('.editBar'));
		elementsWidget.create($('.editBar'));

});