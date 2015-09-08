define(["jquery",
 		"handlebars",
  		"text!views/page.html"], 

	function(jquery, handlebars, pageTemplate){
	var template = handlebars.compile(pageTemplate);

	$("body").append(template());
});