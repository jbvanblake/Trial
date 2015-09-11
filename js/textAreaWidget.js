define(["jquery",
		"underscore",
 		"handlebars",
  		"text!views/textAreaWidgetTemplate.html"], 

	function(jquery, _, handlebars, textAreaWidgetTemplate){
		var pages = [], element;

		var initialize = function(el){

			var content = handlebars.compile(textAreaWidgetTemplate),
			element = $(content());
			el.append(element);

			element.find(".close-text").click(close);

			element.hover(
				function(ev){$(ev.target).find("img").show();},
				function(ev){$(ev.target).find("img").hide();})

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