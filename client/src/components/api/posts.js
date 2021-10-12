const axios = require("axios");

const urlGet = "http://localhost:5000/posts";

const urlPost = "http://localhost:5000/posts/add";

export const fetchPosts = () => {
    const response = axios.get(urlGet);
    return response;
};

export const createPost = (newPost) => axios.post(urlPost, newPost);

