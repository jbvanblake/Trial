define(["jquery",
		"underscore",
 		"handlebars", 	
  		"text!views/settingsTemplate.html"], 

	function(jquery, _, handlebars, settingsTemplate){
		var pages = [],
		element, 
		initialize = function(el){
			element = el,
			wholePage = handlebars.compile(settingsTemplate);
			element.append(wholePage());

			element.find("img").click(swapImg)
		},
		swapImg = function(e){
			var off = $(e.target).attr("src") === "resources/Sprites/toggleOff.png";
			newImage = off ? "resources/Sprites/toggleOn.png" : "resources/Sprites/toggleOff.png";
			$(e.target).attr("src", newImage);

		}

		return {
			create:initialize
		}

	});