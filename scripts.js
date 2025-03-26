/*!
 * Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

//variabler hämtade från index
const modal=document.getElementById("checkout");

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
             <div class="card"
             data-product-id="${product.id}">
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
                           <div class="ratings">`
            + showRatingChicks(product.rating.rate) +
            `
                         </div>
                         </div>
                         <!-- Product description-->
                         <div class="product-description">
                         ${product.description}
                         </div>
                         <!-- Product price-->
                         <div class="price fw-bold">
                         ${product.price}€
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
        const openModal=document.querySelectorAll(".checkoutPress");
        //actionlistener till "köp" knapparna via variabeln ovan
        openModal.forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                modal.style.display = "block";

                const productCard = this.closest(".card");
                const productTitle = productCard.querySelector(".product-title").innerText;
                const productImage = productCard.querySelector(".card-img-top").src;
                const productPriceText = productCard.querySelector(".price").innerText;
                const productPrice = parseFloat(productPriceText.replace('€', '').trim());

                document.getElementById("checkoutProduct").innerHTML = `
                <div class="selected-product" data-original-price="${productPrice}">
                    <img src ="${productImage}" alt="Selected Product" width="100">
                    <h5>${productTitle}</h5>
                    <p>Price: <span class="original-price">${productPrice}</span>€</p>
                    <p class="new-price"></p>
                </div>
                `;
            });
        });
    });
}

//Genererar antal kycklingar beroende på rating. Inte exakt pga heltal, avrundar.
function showRatingChicks(rating){
    const ratingNum = Math.round(rating)
    let ratingChicks = '';

    for(let i = 0; i < ratingNum; i++) {
        ratingChicks += `<img src="assets/Hatching-chick.png" alt="Hatching chick" width="20">`;
    }

    return ratingChicks;
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

    let postalPattern = /^[a-zA-ZåäöÅÄÖ\s]{2,50}$/;

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

//Eventlistener för submit-knappen. Visar popup i nån sekund om formuläret är rätt ifyllt.
checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault()
    orderValidation.style.display = "block";
    orderValidation.style.opacity = "1";

    //completely stäng
    modal.style.display = "none"; //Stänger form-fönstret.

    setTimeout(() => {

        orderValidation.style.transition = "opacity 1s ease-out"; //fade-out-tid
        orderValidation.style.opacity = "0";

        setTimeout(() =>{
            orderValidation.style.display = "none";
        }, 1000)
    }, 1500);   //Millisekunder validation visas i innan fade-out börjar
})

//Hämtar produkter när hemsidan öppnas
document.addEventListener("DOMContentLoaded", function () {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => displayProducts(json))
        .catch(err => console.error(err))
});

document.getElementById("applyDiscount").addEventListener("click", function() {
    const discountCode = document.getElementById("discountCode").value.trim();
    const price = document.querySelector("#checkoutProduct .original-price");
    const newPriceElement = document.querySelector("#checkoutProduct .new-price");
    const priceText = price.textContent;

    const originalPrice = parseFloat(priceText);

    const discountCodes = {
        EASTER15: 15
    };

    if (discountCodes[discountCode]) {
        let discount = discountCodes[discountCode]
        let newPrice = originalPrice - (originalPrice * (discount / 100));

        price.style.textDecoration = 'line-through';
        newPriceElement.textContent = newPrice.toFixed(2) + '€';

    } else {
        alert("Invalid discount code");
    }
});
