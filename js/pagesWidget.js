define(["jquery",
		"underscore",
 		"handlebars", 		
 		"interact",
  		"text!views/pagesWidgetTemplate.html",
  		"text!views/existingPageTemplate.html"], 

	function(jquery, _, handlebars, interact, pageTemplate, existingPageTemplate){
		var pages = [], element;
		var interact = require('interact');

		var initialize = function(el){
			element = el;
			var wholePage = handlebars.compile(pageTemplate);
			var html = wholePage();
			element.append(html);

			element.find(".page-create").click(addPage);

		};
		var addPage = function(event){
			var template = handlebars.compile(existingPageTemplate);
			var newPageId = pages.length+1;
			var newPageName = element.find(".new-page-name").val();
			element.find(".templates-section .editSectionContainer").prepend(template({id:newPageId, pageName:newPageName}));
			element.find(".new-page-name").val("Page");
			pages.push({id:newPageId, el:template({id:newPageId})});

			element.find(".page-delete").click(removePage);

		}

		var removePage = function(event){
			var pageId = $(event.target.parentElement).data("id");
			element.find("[data-id=" + pageId + "]").remove();
		}

		return {
			create:initialize
		};

		
});