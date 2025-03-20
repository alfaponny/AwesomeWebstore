/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


let modal=document.getElementById("checkout");
let openModal=document.querySelectorAll(".checkoutPress");
let closeModal = document.querySelector(".close");
let submitOrder=document.getElementById("orderDone")


console.log("Connection ESTABLISHED", modal, openModal);
console.log("Number of buttons found:", openModal.length);

openModal.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
    });
});

closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


