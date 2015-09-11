define(["jquery",
		"underscore",
 		"handlebars", 	 		
 		"interact",
 		"js/textAreaWidget",
 		"js/navWidget",
 		"js/imageWidget",
  		"text!views/navWidgetTemplate.html"], 

	function(jquery, _, handlebars, interact, textAreaWidget, navWidget, imageWidget, navWidgetTemplate){

		interact = require('interact'),

		createDropZoneContainer = function(pages){
			interact('.page-container').dropzone({
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
							imageWidget.create($(event.target));
							break;
						case "title":
							$(event.target).append("<div class='title' contenteditable='true'><h1>Add Title Here</h1></div>");
							break;
					}



				},
				ondropdeactivate: function (event) {
					// remove active dropzone feedback
					event.target.classList.remove('drop-active');
					event.target.classList.remove('drop-target');
				}
			});

		},
		createElementDraggableAndResizeable = function(selector){

			interact(selector).draggable({
				// enable inertial throwing
			    inertia: true,
			    onmove: dragMoveListener
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
		},
		dragMoveListener = function(event) {
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
		};
		return {
			createDropZoneContainer: createDropZoneContainer,
			createElementDraggableAndResizeable: createElementDraggableAndResizeable
		};
		
});