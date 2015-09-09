define(["jquery",
		"underscore",
 		"handlebars",
  		"text!views/textAreaWidgetTemplate.html"], 

	function(jquery, _, handlebars, textAreaWidgetTemplate){
		var pages = [], parent, element;

		var initialize = function(el){
			parent = el;
			var content = handlebars.compile(textAreaWidgetTemplate);
			var element = $(content());
			parent.append(element);
		};	

		return {
			create:initialize
		};

		
});