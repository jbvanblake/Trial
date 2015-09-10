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

			
				addPage(null,"PAGE");

			_.forEach(pages, function(page){
				addPage(null,page.pageName);
			});


		};
		var addPage = function(event, manualPageName){
			var template = handlebars.compile(existingPageTemplate);
			var newPageId = pages.length+1;
			var newPageName = manualPageName ? manualPageName : element.find(".new-page-name").text();
			element.find(".editSectionContainer").prepend(template({id:newPageId, pageName:newPageName}));
			element.find(".new-page-name").text("ADD NEW PAGE");

			var pageObject = {id:newPageId, html:template({id:newPageId}), name:newPageName};

			pages.push(pageObject);
			onAdd (pageObject);

			element.find(".page-delete").click(removePage);
			element.find(".page-edit").click(editName);


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