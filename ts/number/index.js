"use strict";
const returningUserDisplay = document.querySelector('#returning-user');
const userNameDisplay = document.querySelector('#user');
const reviewTotalDisplay = document.querySelector('#reviews');
const propertyContainer = document.querySelector('.properties');
const footer = document.querySelector('.footer');
const reviewContainer = document.querySelector('.reviews');
const button = document.querySelector('button');
var LoyaltyUser;
(function (LoyaltyUser) {
    LoyaltyUser["GOLD_USER"] = "GOLD_USER";
    LoyaltyUser["SILVER_USER"] = "SILVER_USER";
    LoyaltyUser["BRONZE_USER"] = "BRONZE_USER";
})(LoyaltyUser || (LoyaltyUser = {}));
let isLoggedIn;
const reviews = [
    {
        name: "sheia",
        stars: 5,
        loyaltyUser: LoyaltyUser.GOLD_USER,
        date: "01-01-2021"
    },
    {
        name: 'Andrzej',
        stars: 3,
        loyaltyUser: LoyaltyUser.BRONZE_USER,
        date: '28-03-2021'
    },
    {
        name: 'Omar',
        stars: 4,
        loyaltyUser: LoyaltyUser.SILVER_USER,
        date: '27-03-2021',
        description: 'Great hosts, location was a bit further than said',
    },
];
//Properties
const properties = [
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        title: 'Colombian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 45632,
            country: 'Colombia'
        },
        contact: [123456789, 'marywinkle@gmail.com'],
        isAvailable: true
    },
    {
        image: 'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        title: 'Polish Cottage',
        price: 30,
        location: {
            firstLine: 'no 23',
            city: 'Gdansk',
            code: 343903,
            country: 'Poland'
        },
        contact: [123456789, 'marywinkle@gmail.com'],
        isAvailable: false
    },
    {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        title: 'London Flat',
        price: 25,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 35433,
            country: 'United Kingdom',
        },
        contact: [123456789, 'marywinkle@gmail.com'],
        isAvailable: true
    }
];
// const you: {
//     firstName : string;
//     lastName: string;
//     isReturning: boolean;
//     age: number;
//     stayedAt:(string|number)[]
// } = {
//    firstName: 'Bobby',
//    lastName: 'Brown',
//    isReturning: true,
//    age: 35,
//    stayedAt:['florida-home', 'oman-flat', 'tokyo-bungalow', 23]
// }
const ADMIN = 'admin';
const READ_ONLY = 'read-only';
var Permission;
(function (Permission) {
    Permission[Permission["ADMIN"] = 0] = "ADMIN";
    Permission[Permission["READ_ONLY"] = 1] = "READ_ONLY";
})(Permission || (Permission = {}));
const you = {
    firstName: 'Bobby',
    lastName: 'Brown',
    Permission: Permission.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow', 23]
};
function showReviewTotal(value, reviewer, isLoyalty) {
    if (reviewTotalDisplay) {
        const iconDisplay = isLoyalty ? '⭐' : '';
        reviewTotalDisplay.innerHTML = value.toString() + " Review" + makeMultiple(value) + " last reviewed by " + reviewer + " " + iconDisplay;
    }
}
function populateUser(isReturning, username) {
    if (isReturning) {
        if (returningUserDisplay) {
            returningUserDisplay.innerHTML = "back";
        }
    }
    if (userNameDisplay) {
        userNameDisplay.innerHTML = username;
    }
}
populateUser(you.isReturning, you.firstName);
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);
let authorityStatus;
isLoggedIn = true;
function showDetails(authorityStatus, element, price) {
    if (authorityStatus) {
        const priceDisplay = document.createElement('div');
        priceDisplay.innerHTML = price.toString() + '/night';
        element.appendChild(priceDisplay);
    }
}
//Add the property
for (let i = 0; i < properties.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = properties[i].title;
    const image = document.createElement("img");
    image.setAttribute('src', properties[i].image);
    card.appendChild(image);
    if (propertyContainer) {
        propertyContainer.appendChild(card);
    }
    showDetails(isLoggedIn, card, properties[i].price);
}
function getTopTwoReviews(reviews) {
    const sortedReviews = reviews.sort((a, b) => b.stars - a.stars);
    return sortedReviews.slice(0, 2);
}
let count = 0;
function addReviews(array) {
    if (!count) {
        count++;
        const topTwo = getTopTwoReviews(array);
        for (let i = 0; i < topTwo.length; i++) {
            const card = document.createElement('div');
            card.classList.add('review-card');
            card.innerHTML = topTwo[i].stars + " star from " + topTwo[i].name;
            reviewContainer === null || reviewContainer === void 0 ? void 0 : reviewContainer.appendChild(card);
        }
    }
}
button === null || button === void 0 ? void 0 : button.addEventListener('click', () => addReviews(reviews));
// use your location, your current time, and the current temperature of your
// location
let currentLocation = ["London", "11:35", 17];
if (footer) {
    footer.innerHTML = currentLocation[0] + ' ' + currentLocation[1] + ' ' + currentLocation[2] + '°';
}
function add(firstValue, secondValue) {
    let result;
    if (typeof firstValue === "number" && typeof secondValue == "number") {
        result = firstValue + secondValue;
    }
    if (typeof firstValue === 'string' && typeof secondValue === 'string') {
        result = firstValue + ' ' + secondValue;
    }
    if (typeof firstValue === 'number' && typeof secondValue === 'string') {
        console.log('cannot perform this addition');
    }
    if (typeof firstValue === 'string' && typeof secondValue === 'number') {
        console.log('cannot perform this addition');
    }
}
const combinedReviews = add(5, 1);
const firstNameLastName = add('Ania', 'Kubow');
//return type of function 
function addition(firstValue, secondValue) {
    return firstValue + secondValue;
}
function makeMultiple(value) {
    if (value > 1 || value == 0) {
        return 's';
    }
    else
        return "";
}
//Classes
// class Car{
//     make:string
//     year:number
//     color:string
//     constructor(make:string,year:number,color:string){
//         this.make=make
//         this.year=year
//         this.color=color
//     }
// }
class MainProperty {
    constructor(src, title, reviews) {
        this.src = src;
        this.title = title;
        this.reviews = reviews;
    }
}
let yourMainProperty = new MainProperty("https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", "MarbleHead House", [{
        name: "Olive",
        stars: 5,
        LoyaltyUser: LoyaltyUser.GOLD_USER,
        date: '12-04-2021'
    }]);
const mainImageContainer = document.querySelector('.main-image');
const image = document.createElement('img');
image.setAttribute('src', yourMainProperty.src);
mainImageContainer === null || mainImageContainer === void 0 ? void 0 : mainImageContainer.appendChild(image);
