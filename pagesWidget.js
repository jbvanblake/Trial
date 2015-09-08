define(["jquery",
 		"handlebars",
  		"text!views/mainPageTemplate.html"], 

	function(jquery, handlebars, pageTemplate){

		var initialize = function(element){
			var wholePage = handlebars.compile(pageTemplate);
			element.append(wholePage());

			element.find(".page-delete").click(removePage);




		};
		var removePage = function(event){
			event.target.parentElement.remove();
		}

		return {
			create:initialize
		};

		
});