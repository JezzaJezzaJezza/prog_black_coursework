const { response, json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "client")));

const JSON_file_name = "./new_reviews.json";
app.use(express.json());




const reviews = require(JSON_file_name);

app.get("/comments", function(req, resp){
    const comment_array = reviews.comments;
    resp.send(comment_array);
});

app.get("/posts", function (req, resp){
    const post_keys = Object.keys(reviews.posts);
    resp.send(post_keys);
});

app.get("/posts/:post", function (req, resp){
    const post = req.params.post;
    const title = reviews.posts[post]
    resp.send(title);
});




app.post("/new_rev", function (req, resp) {
    const key = req.body.key;
    const desc_rev = req.body.desc_rev;
    const ratings = req.body.score;
    //decided to store the counter in the same file as json data. Will always be at the end so its fine
    var counter = reviews.next_number;
    //var review_obj = JSON.parse(reviews.posts)
    //review_obj["posts"].push({counter:{"key":key, "desc_rev":desc_rev}})
    var in_array = {key, desc_rev, ratings};
    reviews.posts[counter] = in_array;
    counter += 1
    reviews.next_number = counter
    fs.writeFileSync(JSON_file_name, JSON.stringify(reviews));
    resp.send(reviews);
});

app.post("/new_comment", function (req, resp){
    const key = req.body.key
    const comment = req.body.comment
    var comm_array = {key, comment}
    reviews.comments.push(comm_array)
    fs.writeFileSync(JSON_file_name, JSON.stringify(reviews))
    resp.send(reviews)
})



app.listen(5510)
    module.exports = app