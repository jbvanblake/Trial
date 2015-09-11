define(["jquery",
		"underscore",
 		"handlebars", 	
  		"text!views/navWidgetTemplate.html"], 

	function(jquery, _, handlebars, navWidgetTemplate){
		var pages = [],
		element,
		onAdd,
		onRemove, 
		initialize = function(el, newPages){

			var wholePage = handlebars.compile(navWidgetTemplate),
			pageNamesObject = {pageNames:_.map(newPages, function(page){return {name:page.pageName};})};
			pages = newPages;
			element = el;
			pageNamesObject.pageNames[0].selected = true;

			element.append(wholePage(pageNamesObject));
		},
		update = function(newPages){
			var wholePage = handlebars.compile(navWidgetTemplate),
			pageNamesObject = {pageNames:_.map(newPages, function(page){return {name:page.pageName};})};
			pages=newPages;

			pageNamesObject.pageNames[0].selected = true;

			element.find(".nav-container").html($(wholePage(pageNamesObject)).html());
		};
		
		return {
			create:initialize,
			update:update
		};
		
});