let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        let obj = JSON.parse(this.responseText);

        let productsEL = document.getElementById("products");

        let html = "";

        for (let i = 0; i < obj.length; i++) {
            html += "<p>" + obj[i].createdAt + "</p>";
        }
        productsEL.innerHTML = html;
    }
};

// Use 'true' instead of 'async = true'
xhttp.open("GET", "https://65bd3de2b51f9b29e9332be7.mockapi.io/api/products", true);
xhttp.send();
