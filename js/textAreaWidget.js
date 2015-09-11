define(["jquery",
		"underscore",
 		"handlebars",
  		"text!views/textAreaWidgetTemplate.html"], 

	function(jquery, _, handlebars, textAreaWidgetTemplate){
		var pages = [], element, onUpdate;

		var initialize = function(el, onUpdateCallback){
			onUpdate = onUpdateCallback;

			
			var content = handlebars.compile(textAreaWidgetTemplate),
			element = $(content());
			el.append(element);

			activate(element, onUpdate);

		},
		activate = function(parent, onUpdateCallback){
			onUpdate = onUpdateCallback
			parent.find(".close-text").click(close);


			if(parent.hasClass("pretty-text")){
				parent.find(".text-area").hover(
				function(ev){$(ev.target).find("img").show();},
				function(ev){$(ev.target).find("img").hide();})

				_.forEach(parent.find(".pretty-text"), function(el){
					$(el).get(0).addEventListener("input", function(e){
								   onUpdate();
								}, false);
				});
			}
			else{

				parent.find(".text-area").hover(
					function(ev){$(ev.target).find("img").show();},
					function(ev){$(ev.target).find("img").hide();})

				_.forEach(parent.find(".pretty-text"), function(el){
					$(el).get(0).addEventListener("input", function(e){
								   onUpdate();
								}, false);
				});

			}

			



		},
		close = function(event){
			if($(event.target.parentElement.parentElement).hasClass("warned")){
				$(event.target.parentElement.parentElement).fadeTo( "slow" , 0, function() {
				    // Animation complete.
					$(event.target.parentElement.parentElement).remove();
					
					onUpdate();

				  });
			}
			else {
				event.target.parentElement.parentElement.classList.add("warned");
				$(event.target).attr("src","resources/Sprites/redClose.png" );
			}
		}

		return {
			create:initialize,
			activate: activate
		};

		
});