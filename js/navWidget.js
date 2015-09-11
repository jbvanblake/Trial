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

			$(".existing-page-label").removeClass("active-label");
				$(".existing-page-label[data-id=" + pages[0].id + "]").addClass("active-label");
		},
		activate = function(parent){
			var realId =  false,
			routePageId,
			paramRegex = /pageId=(\d*)(?:.*)/g,
			match = paramRegex.exec(location.search);

			if(match){
				routePageId  = parseInt(match[1]);
				_.forEach(pages,function(p){
					if(p.id === routePageId){
						realId = true;
					}
				});
			}
			if(realId){				
				element.find(".nav-span").removeClass("selected-nav");
				element.find(".nav-span[data-id=" + routePageId + "]").addClass("selected-nav");



				$(".existing-page-label").removeClass("active-label");
				$(".existing-page-label[data-id=" + routePageId + "]").addClass("active-label");
			}



			parent.find(".nav-span").click(swapNav);
		},

		swapNav = function(event){
			var selectedPageId = $(event.target).data("id");
			element.find(".nav-span").removeClass("selected-nav");
			element.find(".nav-span[data-id=" + selectedPageId + "]").addClass("selected-nav");

			$(".existing-page-label").removeClass("active-label");
			$(".existing-page-label[data-id=" + selectedPageId + "]").addClass("active-label");
		},
		update = function(newPages){
			var wholePage = handlebars.compile(navWidgetTemplate),
			pageNamesObject = {pageNames: newPages};
			pages=newPages;


			element.find(".nav-container").html($(wholePage(pageNamesObject)).html());

			element.find(".nav-span").click(swapNav);
		};
		
		return {
			create:initialize,
			update:update,
			activate:activate
		};
		
});