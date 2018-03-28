(function () {
    // ---- XHR REQUEST
    var fetch = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("fetch is working", url);
                var response = JSON.parse(xhr.responseText);
                callback(response);
            } else {
                console.log("XHR error", xhr.readyState);
            }
        });
        xhr.open("GET", url, true);
        xhr.send();
    }

    // ---- EVENT LISTENER
    // ADD EVENT LISTENER TO THE SUBMIT BUTTON, GRAB THE URL
    // CALLS THE FETCH XHR REQUEST
    // PASSES IN THE CALLBACK FUNCTION - DOM MANIPULATION


    // ---- CALLBACK FUNCTION
})();