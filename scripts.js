/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


//variabler hämtade från index
let modal=document.getElementById("checkout");
let openModal=document.querySelectorAll(".checkoutPress");
let closeModal = document.querySelector(".close");
let submitOrder=document.getElementById("orderDone")

//bara error testing på hemsidan (tryck f12 och välj console)
console.log("Connection ESTABLISHED", modal, openModal);
console.log("Number of buttons found:", openModal.length);

//actionlistener till "köp" knapparna via variabeln ovan
openModal.forEach(button => {
    button.addEventListener("click", function() {
        modal.style.display = "block";
    });
});

//actionlistener till krysset på popup
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

//actionlistener till hela sidan, om click != popup, displaya den inte
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

//actionlistener till fullname
document.getElementById("fullName").addEventListener("input", function() {
    let errorMessage = "";

    if (!this.value.includes(" ")) {
        errorMessage = "Please enter both first and last name.";
    } else if (this.value.length < 3 || this.value.length>50) {
        errorMessage = "Unsupported length";
    }

    this.setCustomValidity(errorMessage);
});

//actionlistener till phonenumber
document.getElementById("phoneNumber").addEventListener("input", function() {
    let errorMessage = "";

    //regex
    let phonePattern = /^[0-9\s\-()]+$/

    if (!phonePattern.test(this.value)) {
        errorMessage = "Please enter a valid phone number";
    } else if (this.value.length>50) {
        errorMessage = "Unsupported length";
    }

    this.setCustomValidity(errorMessage);
});

//          address: Min 2 tecken och Max 50 tecken
//           ii. postalCode: Exakt 5 siffror
//           iii. city: Min 2 tecken och Max 50 tecken


