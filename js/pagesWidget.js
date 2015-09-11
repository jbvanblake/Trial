define(["jquery",
		"underscore",
 		"handlebars", 	
  		"text!views/pagesWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, pageTemplate, existingPageTemplate){
		var pages = [],
		element,
		onAdd,
		onUpdate,
		onRemove,
		initialize = function(el, loadedPages, onAddCallback, onUpdateCallback, onRemoveCallback){
			var wholePage = handlebars.compile(pageTemplate);
			onAdd = onAddCallback,			
			onRemove = onRemoveCallback;
			onUpdate = onUpdateCallback;

			pages = loadedPages;
			element = $(wholePage());
			el.append(element);
			element.find(".page-create-icon").click(addPage);
			element.find(".page-create-icon").hover(
				function(e){$(e.target).attr("src","resources/Sprites/plusNormal.png")},
				function(e){$(e.target).attr("src","resources/Sprites/plusHover.png")});

			_.forEach(pages, function(page){
				addPage(null,page);
			});

		},
		addPage = function(event, manualPageAdd){
			var template = handlebars.compile(existingPageTemplate),
			newPageId = manualPageAdd ? manualPageAdd.id : Math.floor(Math.random() * 9999999),
			newPageName = manualPageAdd ? manualPageAdd.pageName : element.find(".new-page-name").text(),
			pageObject = {id:newPageId, html:$(".page-container").html(), pageName:newPageName};

			element.find(".editSectionContainer").prepend(template({id:newPageId, pageName:newPageName}));

			element.find(".new-page-name").text("ADD NEW PAGE");

			if(!manualPageAdd){
				onAdd (pageObject);
			}

			element.find(".page-delete[data-id=" + newPageId + "]").click(removePage);
			element.find(".page-edit[data-id=" + newPageId + "]").click(editName);


			//Hover Styling
			element.find(".page-delete[data-id=" + newPageId + "]").hover(
				function(e){$(e.target).attr("src","resources/Sprites/closeNormal.png")},
				function(e){$(e.target).attr("src","resources/Sprites/closeHover.png")});

			element.find(".page-edit[data-id=" + newPageId + "]").hover(
				function(e){$(e.target).attr("src","resources/Sprites/pencilNormal.png")},
				function(e){$(e.target).attr("src","resources/Sprites/pencilHover.png")});

			element.find(".existing-page-label[data-id=" + newPageId + "]").hover(
				function(e){
					$(e.target).find(".page-delete").show();
					$(e.target).find(".page-edit").show();
				},
				function(e){
					$(e.target).find(".page-delete").hide();
					$(e.target).find(".page-edit").hide();

				});

		},
		editName = function(event){
			var pageName = $(event.target.parentElement.parentElement).attr("contenteditable", true);

			$(event.target.parentElement.parentElement).get(0).addEventListener("input", function(e) {
			    var newName = $(event.target.parentElement.parentElement).find(".page-name").text(),
			    pageId = $(event.target).data("id"),
			    updatedPage = _.find(pages,function(p){return p.id === pageId});

			    updatedPage.pageName = newName;

			    onUpdate(updatedPage);

			}, false);
		},
		removePage = function(event){
			if($(event.target.parentElement.parentElement).hasClass("warned")){

				var pageId = $(event.target).data("id");
				element.find("[data-id=" + pageId + "]").fadeTo( "slow" , 0, function() {
					    // Animation complete.
						element.find("[data-id=" + pageId + "]").remove();
					  });
				onRemove(pageId);
			}
			else{
				event.target.parentElement.parentElement.classList.add("warned");
				$(event.target.parentElement.parentElement).find(".page-edit").hide();
			}
		};

		return {
			create:initialize
		};

		
});