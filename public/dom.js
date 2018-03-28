(function () {
    // ---- XHR REQUEST
    var fetch = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                callback(response);
            } else {
                console.log("XHR error", xhr.readyState);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    var inputField = document.querySelector("#js-input");
    var submitButton = document.querySelector("#js-button");

    // ---- EVENT LISTENER
    // ADD EVENT LISTENER TO THE SUBMIT BUTTON, GRAB THE URL
    // CALLS THE FETCH XHR REQUEST
    // PASSES IN THE CALLBACK FUNCTION - DOM MANIPULATION
    function buildURL() {
        var userInput = inputField.value.toLowerCase().trim();
        var url = "/api/?q=" + userInput;
        return url;
    }

    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        fetch(buildURL(), displayJobs);
    });

    inputField.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            fetch(buildURL(), displayJobs);
        }
    })

    // ---- CALLBACK FUNCTION
    function displayJobs(response) {
        console.log(response);
    }
})();