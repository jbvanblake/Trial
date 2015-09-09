define(["jquery",
		"underscore",
 		"handlebars", 
 		"dropzone",	
  		"text!views/imageWidgetTemplate.html"], 

	function(jquery, _, handlebars, dropzone, imageWidgetTemplate){
		var pages = [], element;

		var initialize = function(el){
			var Dropzone = require("dropzone");
			element = el;
			var wholePage = handlebars.compile(imageWidgetTemplate);
			var html = wholePage();
			element.append(html);
			element.find(".image-container").dropzone({ url: "/file/post" });

		};

		return {
			create:initialize
		};

		
});