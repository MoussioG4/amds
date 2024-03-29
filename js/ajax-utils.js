(function(global){

    // Set up a namespace for the utility
    var ajaxUtils = {};

    // Returns an HTTP request object
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {
        // For very old IE browsers (optional)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported!");
            return (null);
        }
    }

    // Makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function(requestUrl, responseHandler, isJsonResponse) {
            var request = getRequestObject();
            request.onreadystatechange = function() {
                handleResponse(request, responseHandler, isJsonResponse);
            };
            request.open("GET", requestUrl, true);
            request.send(null); //for POST requests only
    };

    // Makes an Ajax POST request to 'targettUrl'
    ajaxUtils.sendPostRequest = function(targetUrl, PostData) {
        var request = getRequestObject();
        request.open("POST", targetUrl, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        request.send(PostData); //for POST requests only

        request.onload = function () {
            if(xhr.status === 201) {
                console.log("Post successfully created!")
            }
        };
    };

    // Only calls user provided 'responseHandler' function if response is ready  and not an error
    function handleResponse(request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) && (request.status == 200)) {

            // Default to isJsonRepsonse = true
            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }

            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText))
            }

            else {
                responseHandler(request.responseText);
            }
        }
    }

    // Epose utility to the global object
    global.$ajaxUtils = ajaxUtils;

})(window);