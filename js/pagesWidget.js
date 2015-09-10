define(["jquery",
		"underscore",
 		"handlebars", 	
  		"text!views/pagesWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, pageTemplate, existingPageTemplate){
		var pages = [], element,  onAdd, onRemove;

		var initialize = function(el, loadedPages, onAddCallback, onRemoveCallback){
			onAdd = onAddCallback;
			pages = loadedPages,
			parent = el;
			onRemove =onRemoveCallback;
			var wholePage = handlebars.compile(pageTemplate);
			element = $(wholePage());
			parent.append(element);
			element.find(".page-create-icon").click(addPage);

			_.forEach(pages, function(page){
				addPage(null,page);
			});

		};
		var addPage = function(event, manualPageAdd){
			var template = handlebars.compile(existingPageTemplate);
			var newPageId = manualPageAdd ? manualPageAdd.id : pages.length+1;
			var newPageName = manualPageAdd ? manualPageAdd.pageName : element.find(".new-page-name").text();
			element.find(".editSectionContainer").prepend(template({id:newPageId, pageName:newPageName}));
			element.find(".new-page-name").text("ADD NEW PAGE");

			var pageObject = {id:newPageId, html:template({id:newPageId}), pageName:newPageName};

			if(!manualPageAdd){

				// pages.push(pageObject);
				onAdd (pageObject);
			}

			element.find(".page-delete[data-id=" + newPageId + "]").click(removePage);
			element.find(".page-edit[data-id=" + newPageId + "]").click(editName);


		}
		var editName = function(event){
			var pageName = $(event.target.parentElement.parentElement).attr("contenteditable", true);
		};

		var removePage = function(event){
			if($(event.target.parentElement.parentElement).hasClass("warned")){

				var pageId = $(event.target).data("id");
				element.find("[data-id=" + pageId + "]").fadeTo( "slow" , 0, function() {
					    // Animation complete.
						element.find("[data-id=" + pageId + "]").remove();
					  });

				// element.find("[data-id=" + pageId + "]").remove();
				onRemove(pageId);
			}
			else{
				event.target.parentElement.parentElement.classList.add("warned");
			}
		}

		return {
			create:initialize
		};

		
});