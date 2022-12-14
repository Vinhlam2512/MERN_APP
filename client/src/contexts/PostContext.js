import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducer/postReducer';
import { ADD_POST, apiUrl, DELETE_POST, FIDN_POST, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, UPDATE_POST } from './constants';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: true,
        message: '',
        type: null,
    });

    // Get all posts
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

    // Add post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    // delete post
    const deletePost = async postId => {
        try {
            const response = axios.delete(`${apiUrl}/posts/${postId}`);
            if (response) {
                dispatch({ type: DELETE_POST, payload: postId });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Find post clicked when user is updating post
    const findPost = postId => {
        const post = postState.posts.find(post => (post._id = postId));
        dispatch({ type: FIDN_POST, payload: post });
    };

    // update post
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' };
        }
    };

    // Post context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        findPost,
        updatePost,
    };
    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
