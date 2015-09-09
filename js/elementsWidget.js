define(["jquery",
		"underscore",
 		"handlebars", 		
 		"interact",
 		"js/textAreaWidget",
 		"js/navWidget",
  		"text!views/elementsWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, interact, textAreaWidget, navWidget, elementsWidgetTemplate){
		var pages = [], element;
		var interact = require('interact');

		var initialize = function(el, newPages){
			pages = newPages;
			element = el;
			var content = handlebars.compile(elementsWidgetTemplate);
			var html = content();
			element.append(html);

			$(".pageContainer")
			createDropZoneContainer();	

			createElementDraggableAndResizeable(".draggable");
				
		};


		var createDropZoneContainer = function(){
			interact('.pageContainer').dropzone({
				// Require a 75% element overlap for a drop to be possible
				overlap: 0.75,

				// listen for drop related events:

				ondropactivate: function (event) {
					// add active dropzone feedback
					event.target.classList.add('drop-active');
				},
				ondragenter: function (event) {
					var draggableElement = event.relatedTarget,
					    dropzoneElement = event.target;

					// feedback the possibility of a drop
					dropzoneElement.classList.add('drop-target');
					draggableElement.classList.add('can-drop');
				},
				ondragleave: function (event) {
					// remove the drop feedback style
					event.target.classList.remove('drop-target');
					event.relatedTarget.classList.remove('can-drop');
				},
				ondrop: function (event) {
					var originalX =event.relatedTarget.getAttribute("data-orig-x");				
					var originalY =event.relatedTarget.getAttribute("data-orig-y");

					var typeDrop = $(event.relatedTarget).data("type");

					event.relatedTarget.setAttribute('data-x', 0);
					event.relatedTarget.setAttribute('data-y', 0);
				    event.relatedTarget.style.transform =
				        'translate(' + 0 + 'px, ' + 0 + 'px)';

					switch(typeDrop){
						case "text":
							textAreaWidget.create($(event.target));
							break;
						case "nav":
							if(pages.length>0){
								navWidget.create($(event.target), pages);
							}
							break;
						case "image":
							$(event.target).append("<div><img src='data:image/jpeg;base64,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'></div>");
							break;
						case "title":
							$(event.target).append("<div><h1>New Header</h1></div>");
							break;
					}



				},
				ondropdeactivate: function (event) {
					// remove active dropzone feedback
					event.target.classList.remove('drop-active');
					event.target.classList.remove('drop-target');
				}
			});

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

			    target.setAttribute
			// translate the element
			target.style.webkitTransform =
			target.style.transform =
			  'translate(' + x + 'px, ' + y + 'px)';

			// update the position attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		}
		var updatePages = function(newPages){
			pages = newPages;
			navWidget.update(newPages);
		}

		
		return {
			create:initialize,
			update: updatePages
		};

		
});