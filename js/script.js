(function (global) {

    var amds = {};

    var homeHtml = "snippets/home-snippet.html";
    var servicesHtml = "snippets/services-snippet.html";
    var productsHtml = "snippets/products-temp-snippet.html";
    var contactHtml = "snippets/contact-snippet.html";
    var sendMailForm = "php/send_mail.php"

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
            var LoadingServices = true;
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

            //Collapse Navbar in mobile view
            var screenWidth = window.innerWidth;
            if (screenWidth < 992) {
                var classes = document.querySelector("#navbarNav").className;
                classes = classes.replace(new RegExp("show", "g"), "");
                document.querySelector("#navbarNav").className = classes;
            };
            $amds.LoadingServices = LoadingServices;
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

            //Collapse Navbar in mobile view
            var screenWidth = window.innerWidth;
            if (screenWidth < 992) {
                var classes = document.querySelector("#navbarNav").className;
                classes = classes.replace(new RegExp("show", "g"), "");
                document.querySelector("#navbarNav").className = classes;
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

            //Collapse Navbar in mobile view
            var screenWidth = window.innerWidth;
            if (screenWidth < 992) {
                var classes = document.querySelector("#navbarNav").className;
                classes = classes.replace(new RegExp("show", "g"), "");
                document.querySelector("#navbarNav").className = classes;
            };        
        }

        // On click on Submit button send mail only in the contact snippet
        window.onload = function() {
            var myEle = document.getElementById("surname_input");
            if(myEle != null) {
                let form = document.getElementById("contact-form");
                let surname = document.getElementById("surname_input");
                let given_name = document.getElementById("given_name_input");
                let email = document.getElementById("email_input");
                let message = document.getElementById("message_input");


                form.addEventListener('submit', function(event) {
                    event.preventDefault();
            
                    var data = new FormData(form);
            
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', sendMailForm);
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            // if the response is json encoded
                            var response = JSON.parse(xhr.responseText);
            
                            if (response.message == 'valid') {
                                // redirect here
                            }
            
                            if (response.message == 'invalid') {
                                // redirect here
                            }
                        }
                    }
                    xhr.send(data); 
                });
            }
        }

        //In mobile view collapse menu when it looses focus --> on blur
        
        document.querySelector("#main-content").addEventListener("click", function() {
            var screenWidth = window.innerWidth;
            if (screenWidth < 992) {
                console.log($amds.LoadingServices);
                var classes = document.querySelector("#navbarNav").className;
                classes = classes.replace(new RegExp("show", "g"), "");
                document.querySelector("#navbarNav").className = classes;
            };            
        });
    });
    
    global.$amds = amds;

})(window);