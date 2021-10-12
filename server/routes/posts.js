const express = require("express");
const router = express.Router();
const PostModel = require("../models/posts");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
        const posts = await PostModel.find();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
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