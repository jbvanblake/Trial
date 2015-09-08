define(["jquery",
 		"handlebars",
 		"pagesWidget",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pagesWidget, pageTemplate){

		pagesWidget.create($('body'));

});