define(["jquery",
		"underscore",
 		"handlebars", 		
 		"js/interactHelper", 		
 		"js/navWidget",
  		"text!views/elementsWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, interactHelper, navWidget, elementsWidgetTemplate){
		var pages = [], 
		element,
		onUpdate,

		initialize = function(el, newPages, onUpdateCallback){			
			var content = handlebars.compile(elementsWidgetTemplate);
			onUpdate = onUpdateCallback;
			pages = newPages;
			element = el;
			element.append(content());

			interactHelper.createDropZoneContainer(pages, elementsHaveChanged);	
			interactHelper.createElementDraggableAndResizeable(".draggable");
				
		},		

		elementsHaveChanged = function(){
			_.forEach(pages, function(page){
				page.html = $(".page-container").html();
				onUpdate(page);
			});
		}
		updatePages = function(newPages){
			pages = newPages;
			navWidget.update(newPages);
		};

		
		return {
			create:initialize,
			update: updatePages,
			elementsHaveChanged : elementsHaveChanged
		};

		
});