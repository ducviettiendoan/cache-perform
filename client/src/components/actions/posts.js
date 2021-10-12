import * as api from "../api/posts";

export const getPosts = () => async (dispatch) => {
    try {
      const response = await api.fetchPosts();
      console.log(response);
      dispatch({ type: "FETCH_ALL", payload: response });
    } catch (error) {
      console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const response = await api.createPost(post);
    console.log(response);
    dispatch({ type: "CREATE_POST", payload: response });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const response = await api.deletePost(id);
    console.log(response);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, updatePost) => async(dispatch) => {
  try{
    const response = await api.updatePost(id, updatePost);
    dispatch({type: "UPDATE_POST", payload: response});
  }catch(error){
    console.log(error);
  }
}