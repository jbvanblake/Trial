require.config({
	paths:{
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
        underscore: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        bootstrap: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
        handlebars: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.2/handlebars",
        text: "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
        interact: "lib/interact.min",
        dropzone: "https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/dropzone-amd-module"
	}
});

require(['main']);