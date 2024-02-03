// js/include.js
document.addEventListener("DOMContentLoaded", function () {
    includeHTML();
});

function includeHTML() {
    var includes = document.querySelectorAll('[data-include]');
    Array.prototype.forEach.call(includes, function (include) {
        var filePath = include.getAttribute('data-include');
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                include.innerHTML = data;
            })
            .catch(error => console.error('Error:', error));
    });
}
