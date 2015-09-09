define(["jquery",
		"underscore",
 		"handlebars", 		
 		"interact",
  		"text!views/elementsWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, interact, elementsWidgetTemplate){
		var pages = [], element;
		var interact = require('interact');

		var initialize = function(el){
			element = el;
			var content = handlebars.compile(elementsWidgetTemplate);
			var html = content();
			element.append(html);

		};
		
		return {
			create:initialize
		};

		
});