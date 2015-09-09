define(["jquery",
		"underscore",
 		"handlebars",
  		"text!views/textAreaWidgetTemplate.html"], 

	function(jquery, _, handlebars, textAreaWidgetTemplate){
		var pages = [], parent, element;

		var initialize = function(el){
			parent = el;
			var content = handlebars.compile(textAreaWidgetTemplate);
			var element = $(content());
			parent.append(element);

			element.find(".close-text").click(close);

		};	
		var close = function(event){
			if($(event.target.parentElement.parentElement).hasClass("warned")){
				$(event.target.parentElement.parentElement).fadeTo( "slow" , 0, function() {
				    // Animation complete.
					$(event.target.parentElement.parentElement).remove();
				  });
			}
			else {
				event.target.parentElement.parentElement.classList.add("warned");
				$(event.target).attr("src","resources/Sprites/redClose.png" );
			}
		}

		return {
			create:initialize
		};

		
});