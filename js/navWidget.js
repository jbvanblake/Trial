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
			pageNamesObject = {pageNames:newPages};
			pages = newPages;
			element = el;
			pageNamesObject.pageNames[0].selected = true;

			element.append(wholePage(pageNamesObject));

			activate(element);
		},
		activate = function(parent){
			parent.find(".nav-span").click(swapNav);
		},

		swapNav = function(event){
			var selectedPageId = $(event.target).data("id");
			element.find(".nav-span").removeClass("selected-nav");

			element.find(".nav-span[data-id=" + selectedPageId + "]").addClass("selected-nav");
		},
		update = function(newPages){
			var wholePage = handlebars.compile(navWidgetTemplate),
			pageNamesObject = {pageNames: newPages};
			pages=newPages;


			// var selectedPageId = $(element.find(".nav-span.selected-nav")[0]).data("id");
			

			// _.find(pageNamesObject.pageNames, function(page){
			// 	page.id =selectedPageId;
			// }).selected = true;

			element.find(".nav-container").html($(wholePage(pageNamesObject)).html());

			element.find(".nav-span").click(swapNav);
		};
		
		return {
			create:initialize,
			update:update,
			activate:activate
		};
		
});