const chai = require("chai");
const chaiHTTP = require("chai-http");

const {app, runServer, closeServer} = require("../server");

const should = chai.should();

chai.use(chaiHTTP);

describe("Blog Posts", function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it("should list items on GET", function() {
        return chai.request(app)
            .get("/blog-posts")
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body.length.should.be.at.least(1);

                const expectedKeys = ["id", "title", "content", "author"];
                res.body.forEach(function(item) {
                    item.should.be.a("object");
                    item.should.include.keys(expectedKeys);
                });
            });
    });

    it("should add an item on POST", function() {
        const newItem = {title: "Is this a test?", content: "I guess so.", author: "testman123"};
        return chai.request(app)
            .post("/blog-posts")
            .send(newItem)
            .then(function(res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.include.keys("id", "title", "content", "author");
                res.body.id.should.not.be.null;
                res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
            });
    });

    it("should update items on PUT", function() {
        const updatedData = {
            title: "foo",
            content: "bar"
        };

        return chai.request(app)
            .get("/blog-posts")
            .then(function(res) {
                updatedData.id = res.body[0].id;
                return chai.request(app)
                    .put(`/blog-posts/${updatedData.id}`)
                    .send(updatedData);
            })
            .then(function(res) {
                res.should.have.status(204);
            });
    });

    it("should delete items on DELETE", function() {
        return chai.request(app)
            .get("/blog-posts")
            .then(function(res) {
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`);
            })
            .then(function(res) {
                res.should.have.status(204);
            });
    });
});

