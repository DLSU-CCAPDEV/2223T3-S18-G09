/* 
    This script creates the database and inserts 5 users (all of which are owners to exactly one establishment), 5 reviews, 5 establishments
*/

// import module `database` from `../models/db.js`
const db = require('./models/db.js');

// To encrypt the '123' password
const bcrypt = require('bcrypt');
const saltRounds = 10;
const defaultpass = "123";
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(defaultpass, salt);
console.log('hashed "123" password: ' + hash);

db.connect();

const mongoose = require('mongoose');

/* import all the collections */
const User = require('./models/UserModel.js');
const Establishment = require('./models/EstablishmentModel.js');
const Review = require('./models/ReviewModel.js');
const EstablishmentOwner = require('./models/EstablishmentOwnerModel.js');
const OwnerResponse = require('./models/OwnerResponseModel.js');

async function insertUser(user) {
    await db.insertOne(User, user);
}

async function insertEstablishmentOwner(establishmentOwner) {
    await db.insertOne(EstablishmentOwner, establishmentOwner);
}

async function insertEstablishment(establishment) {
    await db.insertOne(Establishment, establishment);
}

async function insertReview(review) {
    await db.insertOne(Review, review);
}

/* insert 7 users - 5 owners 2 visitors */
/* the owner accounts */
var user = {
    username: "kenshinfetalvero",
    password: hash,
    first_name: "Kenshin",
    last_name: "Fetalvero",
    description: "CEO of Jollibee",
    avatarImagePath: "../images/default-user-images/default-avatar.png",
    bannerImagePath: "../images/default-user-images/default-banner.jpg",
    location: "Philippines",
    joined: "2023-07-19T00:00:00.000Z"
};

db.insertOne(User, user);

var user = {
    username: "briangabini",
    password: hash,
    first_name: "Brian",
    last_name: "Gabini",
    description: "CEO of Jus and Jerry's",
    avatarImagePath: "../images/default-user-images/default-avatar.png",
    bannerImagePath: "../images/default-user-images/default-banner.jpg",
    location: "Philippines",
    joined: "2023-07-19T00:00:00.000Z"
};

db.insertOne(User, user);

var user = {
    username: "shawnetumalad",
    password: hash,
    first_name: "Shawne",
    last_name: "Tumalad",
    description: "CEO of Burger King",
    avatarImagePath: "../images/default-user-images/default-avatar.png",
    bannerImagePath: "../images/default-user-images/default-banner.jpg",
    location: "Philippines",
    joined: "2023-07-19T00:00:00.000Z"
};

db.insertOne(User, user);

var user = {
    username: "johndolon",
    password: hash,
    first_name: "John",
    last_name: "Dolon",
    description: "CEO of 24 Chicken",
    avatarImagePath: "../images/default-user-images/default-avatar.png",
    bannerImagePath: "../images/default-user-images/default-banner.jpg",
    location: "Philippines",
    joined: "2023-07-19T00:00:00.000Z"
};

db.insertOne(User, user);

var user = {
    username: "jmdolon",
    password: hash,
    first_name: "John",
    last_name: "Dolon",
    description: "CEO of BonChon",
    avatarImagePath: "../images/default-user-images/default-avatar.png",
    bannerImagePath: "../images/default-user-images/default-banner.jpg",
    location: "Philippines",
    joined: "2023-07-19T00:00:00.000Z"
};

db.insertOne(User, user);

/* the other 2 visitor accounts */
var user = {
    username: "randomuser1",
    password: hash,
    first_name: "Alfredo",
    last_name: "Cruz",
    description: "I like burgers!",
    avatarImagePath: "../images/default-user-images/default-avatar.png",
    bannerImagePath: "../images/default-user-images/default-banner.jpg",
    location: "Philippines",
    joined: "2023-07-19T00:00:00.000Z"
};

db.insertOne(User, user);

var user = {
    username: "randomuser2",
    password: hash,
    first_name: "Pepito",
    last_name: "Manaloto",
    description: "I like chicken!",
    avatarImagePath: "../images/default-user-images/default-avatar.png",
    bannerImagePath: "../images/default-user-images/default-banner.jpg",
    location: "Philippines",
    joined: "2023-07-19T00:00:00.000Z"
};

db.insertOne(User, user);

/* map it to the EstablishmentOwner */
var establishmentOwner = {
    username: "kenshinfetalvero",
    establishment_id: 0
};

db.insertOne(EstablishmentOwner, establishmentOwner);

var establishmentOwner = {
    username: "briangabini",
    establishment_id: 1
};

db.insertOne(EstablishmentOwner, establishmentOwner);

var establishmentOwner = {
    username: "shawnetumalad",
    establishment_id: 2
};

db.insertOne(EstablishmentOwner, establishmentOwner);

var establishmentOwner = {
    username: "johndolon",
    establishment_id: 3
};

db.insertOne(EstablishmentOwner, establishmentOwner);

var establishmentOwner = {
    username: "jmdolon",
    establishment_id: 4
};

db.insertOne(EstablishmentOwner, establishmentOwner);

/* insert 5 establishments */
var establishment = {
    establishment_id: 0,
    name: "Jollibee",
    description: "Jollibee's fried chicken - Chickenjoy, spaghetti & burgers made it one of the fastest growing restaurants in the world with 1400+ branches globally. People also ask",
    contact: "09293939191",
    address: "10/F Jollibee Plaza Building, Emerald Ave., Ortigas Center, Pasig City",
    overall_rating: 5,
    total_reviews: 1,
    imagePaths: {
        establishmentPfpPath: "../images/Establishments/Jollibee/jollibee_pfp.png",
        establishmentMapPath: "../images/Establishments/Jollibee/jollibee_map.png",
        establishmentHeaderPath: "../images/Establishments/Jollibee/jollibee_header.jpg",
        establishmentMenuPhotos: [
            "../images/Establishments/Jollibee/photos/jollibee_menu1.png"
        ],
        establishmentFoodPhotos: [
            "../images/Establishments/Jollibee/photos/jollibee_img1.jpg"
        ]
    },
    establishmentTime: {
        Monday: "7:00 AM - 9:00 PM",
        Tuesday: "7:00 AM - 9:00 PM",
        Wednesday: "7:00 AM - 9:00 PM",
        Thursday: "7:00 AM - 9:00 PM",
        Friday: "7:00 AM - 9:00 PM",
        Saturday: "7:00 AM - 9:00 PM",
        Sunday: "7:00 AM - 9:00 PM"
    }
}

db.insertOne(Establishment, establishment);

var establishment = {
    establishment_id: 1,
    name: "Jus and Jerry's",
    description: "Jus & Jerry’s Food Corp. was founded by identical twin brothers Justin and Jeremy as a small cafeteria-style back in 2010. Their first store was located along Tolentino St., Manila near UST. A year later, they moved to a bigger location in Taft Ave., Manila to cater to more patrons.",
    contact: "0923458521",
    address: "EGI TAFT TOWER, Unit 112 G/F, 2339 Taft Ave, Malate, Manila, 1004 Metro Manila",
    overall_rating: 5,
    total_reviews: 1,
    imagePaths: {
        establishmentPfpPath: "../images/Establishments/Jus and Jerry's/jus-and-jerrys_pfp.png",
        establishmentMapPath: "../images/Establishments/Jus and Jerry's/jus-and-jerrys_map.png",
        establishmentHeaderPath: "../images/Establishments/Jus and Jerry's/jus-and-jerrys_header.jpg",
        establishmentMenuPhotos: [
            "../images/Establishments/Jus and Jerry's/photos/jus-and-jerrys_menu1.png"
        ],
        establishmentFoodPhotos: [
            "../images/Establishments/Jollibee/photos/jollibee_img1.jpg"
        ]
    },
    establishmentTime: {
        Monday: "10:30 AM - 7:00 PM",
        Tuesday: "10:30 AM - 7:00 PM",
        Wednesday: "10:30 AM - 7:00 PM",
        Thursday: "10:30 AM - 7:00 PM",
        Friday: "10:30 AM - 7:00 PM",
        Saturday: "10:30 AM - 7:00 PM",
        Sunday: "10:30 AM - 7:00 PM"
    }
}

db.insertOne(Establishment, establishment);

var establishment = {
    establishment_id: 2,
    name: "Burger King",
    description: "Founded in 1954, Burger King is the second largest fast food hamburger chain in the world. The original Home of the Whopper, our commitment to premium ingredients, signature recipes, and family-friendly dining experiences is what has defined our brand for more than 50 successful years.",
    contact: "0948574892",
    address: "2/F, Burger King Building, 275, E. Rodriguez Sr. Avenue, Quezon City",
    overall_rating: 5,
    total_reviews: 1,
    imagePaths: {
        establishmentPfpPath: "../images/Establishments/Burger King/burger-king_pfp.png",
        establishmentMapPath: "../images/Establishments/Burger King/burger-king_map.png",
        establishmentHeaderPath: "../images/Establishments/Burger King/burger-king_header.jpg",
        establishmentMenuPhotos: [
            "../images/Establishments/Burger King/photos/burger-king_menu1.jpg"
        ],
        establishmentFoodPhotos: [
            "../images/Establishments/Burger King/photos/burger-king_img1.png"
        ]
    },
    establishmentTime: {
        Monday: "Open 24 Hours",
        Tuesday: "Open 24 Hours",
        Wednesday: "Open 24 Hours",
        Thursday: "Open 24 Hours",
        Friday: "Open 24 Hours",
        Saturday: "Open 24 Hours",
        Sunday: "Open 24 Hours"
    }
}

db.insertOne(Establishment, establishment);

var establishment = {
    establishment_id: 3,
    name: "24 Chicken",
    description: "At 24 Chicken, we are obsessed with serving the best possible fried chicken. Serving happiness at a budget friendly price since 2017.",
    contact: "09234567964",
    address: "24 Chicken P.Noval- Dapitan UST",
    overall_rating: 5,
    total_reviews: 1,
    imagePaths: {
        establishmentPfpPath: "../images/Establishments/24 Chicken/24-chicken_pfp.jpg",
        establishmentMapPath: "../images/Establishments/24 Chicken/24-chicken_map.png",
        establishmentHeaderPath: "../images/Establishments/24 Chicken/24-chicken_header.jpg",
        establishmentMenuPhotos: [
            "../images/Establishments/24 Chicken/photos/24-chicken_menu1.jpg"
        ],
        establishmentFoodPhotos: [
            "../images/Establishments/24 Chicken/photos/24-chicken_img1.jpg"
        ]
    },
    establishmentTime: {
        Monday: "10:00 AM - 9:00 PM",
        Tuesday: "10:00 AM - 9:00 PM",
        Wednesday: "10:00 AM - 9:00 PM",
        Thursday: "10:00 AM - 9:00 PM",
        Friday: "10:00 AM - 9:00 PM",
        Saturday: "10:00 AM - 9:00 PM",
        Sunday: "10:00 AM - 9:00 PM"
    }
}

db.insertOne(Establishment, establishment);

var establishment = {
    establishment_id: 4,
    name: "BonChon",
    description: "Crunch out loud! We set out to share the joy of hand-battered, double-fried, crazy crispy Korean Fried Chicken around the world.",
    contact: "09294588561",
    address: "Alabang Town Center, Muntinlupa",
    overall_rating: 5,
    total_reviews: 1,
    imagePaths: {
        establishmentPfpPath: "../images/Establishments/Bonchon/bonchon_pfp.png",
        establishmentMapPath: "../images/Establishments/Bonchon/bonchon_map.png",
        establishmentHeaderPath: "../images/Establishments/Bonchon/bonchon_header.jpg",
        establishmentMenuPhotos: [
            "../images/Establishments/Bonchon/photos/bonchon_menu1.jpg"
        ],
        establishmentFoodPhotos: [
            "../images/Establishments/Bonchon/photos/bonchon_img1.jpg"
        ]
    },
    establishmentTime: {
        Monday: "11:00 AM - 9:00 PM",
        Tuesday: "11:00 AM - 9:00 PM",
        Wednesday: "11:00 AM - 9:00 PM",
        Thursday: "11:00 AM - 9:00 PM",
        Friday: "11:00 AM - 9:00 PM",
        Saturday: "10:00 AM - 10:00 PM",
        Sunday: "10:00 AM - 9:00 PM"
    }
}

db.insertOne(Establishment, establishment);

/* insert 5 reviews */
/* for the demo there would be 1 review each coming from the visitor accounts */
var review = {
    review_id: 0,
    username: "randomuser1",
    establishment_id: 0,
    title: "BURGER STEAK IS THE BEST!",
    body_desc: "I really like the burger steak in this restaurant ever since I was a kid.",
    date: "2017-10-05",
    edited: false,
    rating: 5,
    votes: {
        numUpvotes: 0,
        numDownvotes: 0,
        upvotes: [],
        downvotes: []
    },
};

db.insertOne(Review, review);

var review = {
    review_id: 1,
    username: "randomuser1",
    establishment_id: 1,
    title: "Chicken Chops are the best!",
    body_desc: "I really like the chicken chops with the garlicky soy garlic flavor 5 out 5 would recommend!",
    date: "2017-10-27",
    edited: false,
    rating: 5,
    votes: {
        numUpvotes: 0,
        numDownvotes: 0,
        upvotes: [],
        downvotes: []
    },
};

db.insertOne(Review, review);

var review = {
    review_id: 2,
    username: "randomuser2",
    establishment_id: 2,
    title: "WHOPPER IS THE BEST!",
    body_desc: "I really like ordering from this restaurant when I'm craving for a good burger.",
    date: "2017-10-11",
    edited: false,
    rating: 5,
    votes: {
        numUpvotes: 0,
        numDownvotes: 0,
        upvotes: [],
        downvotes: []
    },
};

db.insertOne(Review, review);

var review = {
    review_id: 3,
    username: "randomuser2",
    establishment_id: 3,
    title: "Sulit na masarap pa",
    body_desc: "Nagustuhan ko yung chicken nila kasi malaki yung serving tapos masarap pa yung lasa.",
    date: "2017-10-23",
    edited: false,
    rating: 5,
    votes: {
        numUpvotes: 0,
        numDownvotes: 0,
        upvotes: [],
        downvotes: []
    },
};

db.insertOne(Review, review);

var review = {
    review_id: 4,
    username: "randomuser2",
    establishment_id: 4,
    title: "Bulgogi is good",
    body_desc: "I tried the bulgogi once as well as the korean chicken, it was really good and I would recommend it to anyone!",
    date: "2017-10-04",
    edited: false,
    rating: 5,
    votes: {
        numUpvotes: 0,
        numDownvotes: 0,
        upvotes: [],
        downvotes: []
    },
};
db.insertOne(Review, review);

var resp = {
    review_id: 0,
    body_desc: 'Thanks for the reply, we hope to see you around!',
    date: '2023-04-04'
};

db.insertOne(OwnerResponse, resp);

var resp = {
    review_id: 2,
    body_desc: 'I like the part when he said {give example}, definitely one of the reviews of all time.',
    date: '2023-05-24'
};

db.insertOne(OwnerResponse, resp);

var resp = {
    review_id: 4,
    body_desc: 'Haha, I like your\'e enthusiasm, we might bring in more varieties in the future so stay tuned.',
    date: '2023-06-17'
};

db.insertOne(OwnerResponse, resp);
