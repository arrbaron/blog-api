const express = require("express");
const morgan = require("morgan");

// creates express server
const app = express();

// importing blogPostsrouter
const blogPostsRouter = require("./blogPostsRouter");

app.use(morgan("common"));

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.sendfile(__dirname + "/views/index.html");
// });

app.use("/blog-posts", blogPostsRouter);

let server;

const runServer = () => {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on("error", err => {
            reject(err);
        });
    });
};

const closeServer = () => {
    return new Promise((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};