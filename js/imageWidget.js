define(["jquery",
		"underscore",
 		"handlebars", 
 		"dropzone",	
  		"text!views/imageWidgetTemplate.html"], 

	function(jquery, _, handlebars, dropzone, imageWidgetTemplate){
		var pages = [], element;

		var initialize = function(el){
			var Dropzone = require("dropzone"),
			element = el,
			wholePage = handlebars.compile(imageWidgetTemplate);
			
			element.append(wholePage());
			element.find(".image-container").dropzone({ url: "http://localhost:8080/WeeblyTrialProject/api/page/img" , init:function(){
				this.on("sending", function(file){
					element.find(".add-image-image").hide();				
					element.find(".add-image-label").hide();

					element.find(".image-container").removeClass("image-container");
				});
			}});

		};

		return {
			create:initialize
		};

		
});