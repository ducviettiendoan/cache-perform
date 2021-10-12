const axios = require("axios");

const urlGet = "http://localhost:5000/posts";

const urlPost = "http://localhost:5000/posts/add";

const urlDelete = "http://localhost:5000/posts/delete";

const urlUpdate = "http://localhost:5000/posts/update";
export const fetchPosts = () => {
    const response = axios.get(urlGet);
    return response;
};

export const createPost = (newPost) => axios.post(urlPost, newPost);

export const deletePost = (id) => axios.delete(`${urlDelete}/${id}`);

export const updatePost = (id, updatePost) => axios.put(`${urlUpdate}/${id}`, updatePost);