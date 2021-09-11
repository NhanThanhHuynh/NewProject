import { createContext, useReducer } from "react";
import React from "react";
import axios from "axios";
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "./constants";
import { PostsReducer } from "../reducers/PostsReducer";
import { useState } from "react";

export const PostContext = createContext();

const PostcontextProvider = ({ children }) => {
  //State
  const [postState, dispatch] = useReducer(PostsReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });
  const [showAddPostModal, SetshowAddPostModal] = useState(false);
  const [showUpdatePostModal, SetshowUpdatePostModal] = useState(false);
  const [showToast, SetshowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //GetAllPost
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };
  //Add Post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.reponse.data
        : { success: false, message: "Server error" };
    }
  };
  //Delete Post
  const deletePost = async (PostID) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${PostID}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: PostID });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Find post when user is updating
  const findPost = (PostID) => {
    const post = postState.posts.find((x) => x._id === PostID);
    dispatch({ type: FIND_POST, payload: post });
  };

  //Update Post
  const updatePost = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatePost._id}`,
        updatePost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.reponse.data
        : { success: false, message: "Server error" };
    }
  };
  //Take away
  const PostContextData = {
    postState,
    getPosts,
    showAddPostModal,
    SetshowAddPostModal,
    addPost,
    showToast,
    SetshowToast,
    deletePost,
    updatePost,
    findPost,
    SetshowUpdatePostModal,
    showUpdatePostModal,
  };

  return (
    <PostContext.Provider value={PostContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostcontextProvider;
