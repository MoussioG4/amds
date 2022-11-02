// $(function () { // Need to rewrite this bcs bootstrap 5.2 does not use jquery 

    // Same as document.querySelector("navbarToggle").addEventListener("blur", ...)
  //  $("#navbarToggle").blur(function (event) {
   //     var screenWidth = window.innerWidth;
    //    if (screenWidth < 992) {
     //       $("#navbarNav").collapse('hide');
      //  }
   // });
// });

(function (global) {

    var amds = {};
    
    var homeHtml = "snippets/home-snippet.html";
    var servicesHtml = "snippets/services-snippet.html";
    var productsHtml = "snippets/products-snippet.html";
    var contactHtml = "snippets/contact-snippet.html"

    // Convinienve function for inserting innerHtmL for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'
    var showLoading = function(selector) {
        var html = "<div class='text-center'>";
        html += "<img src='pictures/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    }

    // On page load (before images or css)
    document.addEventListener("DOMContentLoaded", function (event) {

        // On first load show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(homeHtml, function (responseText) {
            document.querySelector("#main-content").innerHTML = responseText;
        },
        false);

        // On click on Services load services
        amds.loadServices = function (){
            showLoading("#main-content");
            $ajaxUtils.sendGetRequest(servicesHtml, function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);

            //Remove active state from all other buttons
            var classes = document.querySelector("#ProductsButton").className;
            classes = classes.replace(new RegExp("active-button", "g"), "");
            document.querySelector("#ProductsButton").className = classes;
            classes = document.querySelector("#ContactButton").className;
            classes = classes.replace(new RegExp("active-button", "g"), "");
            document.querySelector("#ContactButton").className = classes;

            //Add active state to the Services button
            classes = document.querySelector("#ServicesButton").className;
            if (classes.indexOf("active-button") == -1) {
                classes += " active-button";
                document.querySelector("#ServicesButton").className = classes;
            };
        };

        // On click on Products load products
        amds.loadProducts = function (){
            showLoading("#main-content");
            $ajaxUtils.sendGetRequest(productsHtml, function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);

            //Remove active state from all other buttons
            var classes = document.querySelector("#ServicesButton").className;
            classes = classes.replace(new RegExp("active-button", "g"), "");
            document.querySelector("#ServicesButton").className = classes;
            classes = document.querySelector("#ContactButton").className;
            classes = classes.replace(new RegExp("active-button", "g"), "");
            document.querySelector("#ContactButton").className = classes;

            //Add active state to the Products button
            classes = document.querySelector("#ProductsButton").className;
            if (classes.indexOf("active-button") == -1) {
                classes += " active-button";
                document.querySelector("#ProductsButton").className = classes;
            };
        }

        // On click on Contact us load contact page
        amds.loadContact = function (){
            showLoading("#main-content");
            $ajaxUtils.sendGetRequest(contactHtml, function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);

            //Remove active state from all other buttons
            var classes = document.querySelector("#ServicesButton").className;
            classes = classes.replace(new RegExp("active-button", "g"), "");
            document.querySelector("#ServicesButton").className = classes;
            classes = document.querySelector("#ProductsButton").className;
            classes = classes.replace(new RegExp("active-button", "g"), "");
            document.querySelector("#ProductsButton").className = classes;

            //Add active state to the Contact button
            classes = document.querySelector("#ContactButton").className;
            if (classes.indexOf("active-button") == -1) {
                classes += " active-button";
                document.querySelector("#ContactButton").className = classes;
            };
        }
    });
    
    global.$amds = amds;

})(window);