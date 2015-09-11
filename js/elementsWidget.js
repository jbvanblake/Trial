define(["jquery",
		"underscore",
 		"handlebars", 		
 		"js/interactHelper",
  		"text!views/elementsWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, interactHelper, elementsWidgetTemplate){
		var pages = [], 
		element,

		initialize = function(el, newPages){			
			var content = handlebars.compile(elementsWidgetTemplate);
			pages = newPages;
			element = el;
			element.append(content());

			interactHelper.createDropZoneContainer(pages);	
			interactHelper.createElementDraggableAndResizeable(".draggable");
				
		},		
		updatePages = function(newPages){
			pages = newPages;
			navWidget.update(newPages);
		};

		
		return {
			create:initialize,
			update: updatePages
		};

		
});