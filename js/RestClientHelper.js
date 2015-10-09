define(["jquery",
		"underscore"], 

	function(jquery, _){
		var pages = [], element,  onAdd, onRemove;

		var sendRequest = function(method, url, payload, callback){

//			var xhr = createCORSRequest(method, url);
//			if (!xhr) {
//			  throw new Error('CORS not supported');
//			}
//			if(callback){
//				xhr.onload = function(data){
//					callback(xhr, data);
//				}
//			}
//
//			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//			if(payload){
//				xhr.send(payload);
//			}
//			else{
//				xhr.send();
//			}
            if(callback){
                callback({},{});
            }

		};



		var createCORSRequest = function (method, url) {
			  var xhr = new XMLHttpRequest();
			  if ("withCredentials" in xhr) {

				    // Check if the XMLHttpRequest object has a "withCredentials" property.
				    // "withCredentials" only exists on XMLHTTPRequest2 objects.
				    xhr.open(method, url, true);

			  } else if (typeof XDomainRequest != "undefined") {

				    // Otherwise, check if XDomainRequest.
				    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
				    xhr = new XDomainRequest();
				    xhr.open(method, url);

			  } else {

				    // Otherwise, CORS is not supported by the browser.
				    xhr = null;

			  }
			  return xhr;
		}

		
		return {
			sendRequest:sendRequest
		};
		
});