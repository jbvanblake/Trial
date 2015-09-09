define(["jquery",
 		"handlebars",
 		"pagesWidget",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pagesWidget, pageTemplate){
		var mainPage = handlebars.compile(pageTemplate);
		$('body').append(mainPage());
		pagesWidget.create($('.pageContainer'));
		// elementsWidget.create($('body'));

});