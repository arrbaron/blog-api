const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const {BlogPosts} = require("./models");

// adding some blog posts
BlogPosts.create( 
    "Are cats actually aliens?", // title
    "Yes.", // content
    "catmaster123", // author
    "November 9th, 2017" // date
);

BlogPosts.create(
    "CATS ARE ACTUALLY ALIENS", // title
    "WE KNEW IT ALL ALONG.", // content
    "catmaster123", // author
    "November 10th, 2017" // date
);

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

// CREATE

// READ

// UPDATE

// DESTROY