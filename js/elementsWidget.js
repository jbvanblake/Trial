define(["jquery",
		"underscore",
 		"handlebars", 		
 		"interact",
  		"text!views/elementsWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, interact, elementsWidgetTemplate){
		var pages = [], element;
		var interact = require('interact');

		var initialize = function(el){
			element = el;
			var content = handlebars.compile(elementsWidgetTemplate);
			var html = content();
			element.append(html);

			createElementDraggableAndResizeable(".element-draggable");
			
		};
		var createElementDraggableAndResizeable = function(selector){

			interact(selector).draggable({
				// enable inertial throwing
			    inertia: true,
			    onmove: dragMoveListener
			}).resizable({
    			edges: { left: true, right: true, bottom: true, top: true }
  			}).on('resizemove', function (event) {
			    var target = event.target,
			        x = (parseFloat(target.getAttribute('data-x')) || 0),
			        y = (parseFloat(target.getAttribute('data-y')) || 0);

			    // update the element's style
			    target.style.width  = event.rect.width + 'px';
			    target.style.height = event.rect.height + 'px';

			    // translate when resizing from top or left edges
			    x += event.deltaRect.left;
			    y += event.deltaRect.top;

			    target.style.webkitTransform = target.style.transform =
			        'translate(' + x + 'px,' + y + 'px)';

			    target.setAttribute('data-x', x);
			    target.setAttribute('data-y', y);
  			});
		};


		var dragMoveListener = function(event) {
			var target = event.target,
			    // keep the dragged position in the data-x/data-y attributes
			    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

			// translate the element
			target.style.webkitTransform =
			target.style.transform =
			  'translate(' + x + 'px, ' + y + 'px)';

			// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		}
		
		return {
			create:initialize
		};

		
});