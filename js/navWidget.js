define(["jquery",
		"underscore",
 		"handlebars", 	
  		"text!views/navWidgetTemplate.html"], 

	function(jquery, _, handlebars, navWidgetTemplate){
		var pages = [], element,  onAdd, onRemove;

		var initialize = function(el, newPages){
			pages = newPages;
			element = el;
			var wholePage = handlebars.compile(navWidgetTemplate);
			var pageNamesObject = {pageNames:_.map(pages, function(page){return {name:page.name};})};
			pageNamesObject.pageNames[0].selected = true;

			var html = wholePage(pageNamesObject);
			element.append(html);

		};
		var update = function(newPages){
			pages=newPages;
		}
		
		return {
			create:initialize,
			update:update
		};

		
});