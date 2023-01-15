const express = require("express");
const router = express.Router();
const PostModel = require("../models/posts");
const mongoose = require("mongoose");
const Redis = require("redis"); //using Redis 3.1.2 version. Above 4. version callback func does not work

const redisClient = Redis.createClient()
redisClient.on('connect', () => console.log('connected to redis'));

router.get("/", async (req, res) => {
    redisClient.get("posts", async (error, posts)=>{
        if (error) console.error(error);
        if (posts){
            console.log("has redis key");
            return res.status(200).json(JSON.parse(posts))
        }else{
            console.log("create redis key");
            try {
                const posts = await PostModel.find();
                redisClient.set('posts', JSON.stringify(posts))
                return res.status(200).json(posts);
            } catch (err) {
                return res.status(404).json({ message: err.message })
            }
        }
    })
})

router.post("/add", async (req, res) => {
    const newPost = new PostModel(req.body);  //create a new post (aka a new instance of PostModel)
    try {
        await newPost.save(); //return a promise
        res.status(201).json(newPost);
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
})

router.delete("/delete/:id", async (req, res) => {
    const routeParam = req.params;
    if (!mongoose.Types.ObjectId.isValid(routeParam.id)) {
        return res.status(404).send(`No post with ID: ${routeParam.id}`);
    }
    await PostModel.findByIdAndRemove(routeParam.id);
    res.status(200).send("Post is deleted!");
})

router.put("/update/:id", async (req, res) => {
    try {
        const requestPost = req.body;  //create a new post (aka a new instance of PostModel)
        const updateParam = req.params;
        if (!mongoose.Types.ObjectId.isValid(updateParam.id)) {
            return res.status(404).send(`No post with ID: ${updateParam.id}`);
        }
        const updatePost = await PostModel.findByIdAndUpdate(updateParam.id, requestPost);
        res.json(updatePost);
    } catch (error) {
        res.send(error);
    }
})
module.exports = router;