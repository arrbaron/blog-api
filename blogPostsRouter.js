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

// CREATE
router.post("/", jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author"];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body.`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const newBlogPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(newBlogPost);
});

// READ
router.get("/", (req, res) => {
    res.json(BlogPosts.get());
});

// UPDATE
router.put("/:id", jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author"];

    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body.`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id ${req.params.id} and request body id ${req.body.id} must match`
        );
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blog post ${req.params.id}.`);
    console.log(req.body);
    const updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    res.status(204).end();
});

// DESTROY
router.delete("/:id", (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post with id ${req.params.id}`);
    res.status(204).end();
});

module.exports = router;