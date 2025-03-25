/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

//variabler hämtade från index
const modal=document.getElementById("checkout");
const openModal=document.querySelectorAll(".checkoutPress");
const closeModal = document.querySelector(".close");
//const submitOrder=document.getElementById("orderDone");
const orderValidation = document.getElementById("orderValidation");
const checkoutForm = document.getElementById("checkoutForm");


//bara error testing på hemsidan (tryck f12 och välj console)
//console.log("Connection ESTABLISHED", modal, openModal);
//console.log("Number of buttons found:", openModal.length);

//Tar emot produkterna i json-format och skapar upp kort med produkt-egenskaper
function displayProducts(json) {
    const cardContainerRow = document.querySelector('#cardContainer .row')

    cardContainerRow.innerHTML = '';

    json.forEach(product => {
        const productCard = `
            <div class="card">
                <!-- Product image-->
                <div class="card-container-img">
                <img
                    class="card-img-top"
                    src="${product.image}"
                    alt="product picture"
                />
                </div>
                <!-- Product details-->
                <div class="card-body">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="product-title">${product.title}</h5>
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <img src="assets/Hatching-chick.png" alt="Hatching chick" width="20">
                                <img src="assets/Hatching-chick.png" alt="Hatching chick" width="20">
                                    <img src="assets/Hatching-chick.png" alt="Hatching chick" width="20">
                                        <img src="assets/Hatching-chick.png" alt="Hatching chick" width="20">
                                            <img src="assets/Hatching-chick.png" alt="Hatching chick" width="20">

                        </div>
                        <!-- Product description-->
                        <div class="product-description">
                        ${product.description}
                        </div>
                        <!-- Product price-->
                        <div class="price fw-bold">
                        ${product.price}:-
                        </div>
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="checkoutPress btn btn-outline-dark mt-auto"
                        >Buy now</a
                        >
                    </div>
                </div>
            </div>
            `;
        cardContainerRow.innerHTML += productCard;

        //actionlistener till "köp" knapparna via variabeln ovan
        openModal.forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                modal.style.display = "block";
            });
        });
    });
}

//actionlistener till krysset på popup
closeModal.addEventListener("click", function () {
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

// address: Min 2 tecken och Max 50 tecken
document.getElementById(("address")).addEventListener("input", function() {
    let errorMessage = "";

    let postalPattern = /^.{2,50}$/;

    if (!postalPattern.test(this.value)) {
        errorMessage = "Please enter a valid address"
    }

    this.setCustomValidity(errorMessage);
});

// ii. postalCode: Exakt 5 siffror
document.getElementById(("postalCode")).addEventListener("input", function() {
    let errorMessage = "";

    let postalPattern = /^\d{5}$/;

    if (!postalPattern.test(this.value)) {
        errorMessage = "Please enter a valid postal number"
    }

    this.setCustomValidity(errorMessage);
});
// iii. city: Min 2 tecken och Max 50 tecken
document.getElementById(("city")).addEventListener("input", function() {
    let errorMessage = "";

    let postalPattern = /^([A-Z]|Å|Ä|Ö)([a-z]|å|ä|ö)+$/;

    if (!postalPattern.test(this.value)) {
        errorMessage = "Please enter a valid city"
    }

    this.setCustomValidity(errorMessage);
});

const eggs = document.querySelectorAll(".hidden-egg");
const totalEggs = eggs.length;
let foundCount = 0; // Initialize foundCount

eggs.forEach(egg => {
    egg.addEventListener("click", function() {
        if (this.style.opacity !== "1") {
            this.style.opacity = "1";
            foundCount++;
            document.getElementById("eggCounter").innerText = `Found ${foundCount}/${totalEggs} Easter Eggs!`;
        }
        if (foundCount === totalEggs) {
            document.getElementById("eggCounter").innerText = 'Congratulations! You found all of the eggs! \n' +
                'You get 15% discount with code: EASTER15';
        }
    });
});

//Eventlistener för submit-knappen. Visar popup i nån sekund om orden är rätt ifylld.
checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault()

    orderValidation.style.display = "block";

    setTimeout(() => {
        orderValidation.style.display = "none"
    }, 2000);   //Millisekunder validation visas i innan stängs
    modal.style.display = "none";   //Stänger form-fönstret.
})


//Hämtar produkter när hemsidan öppnas
document.addEventListener("DOMContentLoaded", function () {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => displayProducts(json))
        .catch(err => console.error(err))
});
