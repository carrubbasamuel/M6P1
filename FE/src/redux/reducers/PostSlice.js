import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./LoginSlice";

export const fetchAuthors = createAsyncThunk(
    'authors/fetchAuthors',
    async (currentPage, { getState, dispatch }) => {
        try {
            const state = getState();
            const ApiKey = state.login.userLogged.token;
            const response = await axios.get(`http://localhost:3003/posts?page=${currentPage}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + ApiKey,
                },
            });
            const { data } = response; // Utilizza data destructuring per estrarre i dati dal response object
            return data;
        } catch (error) {
            if (error.response.status === 401) dispatch(logout());
            throw error;
        }
    }
);



export const fetchNewPost = createAsyncThunk(
    'authors/fetchNewPost',
    async (post, { getState }) => {
        console.log(post);
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('category', post.category);
        formData.append('coverImg', post.cover);
        formData.append('content', post.content);
        formData.append('readTime.value', post.readTime.value);

        const user = getState().login.userLogged;
        const ApiKey = user.token;
        try {
            const response = await axios.post('http://localhost:3003/posted', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + ApiKey,
                }
            });
            const { data } = response;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const fetchMyPosts = createAsyncThunk(
    'authors/fetchMyPosts',
    async (_, { getState }) => {
        const user = getState().login.userLogged;
        const { token } = user;

        try {
            const response = await axios.get('http://localhost:3003/MyPosts', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token,
                }
            });
            const { data: { posts } } = response;
            console.log(posts);
            return posts;
        } catch (error) {
            console.log(error);
            getState().author.error = error;
            throw error;

        }
    }
)


export const fetchDeletePost = createAsyncThunk(
    'authors/fetchDeletePost',
    async (id, { getState }) => {
        try {
            const user = getState().login.userLogged;
            const { token } = user;
            const response = await axios.delete(`http://localhost:3003/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token,
                }
            });
            const { data } = response;
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)



const initialState = {
    data: [],
    loading: false,
    error: null,
    tokenValidation: null,
    totalPage: 0,
}

const PostSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                if (action.payload.statusCode === 401) {
                    state.tokenValidation = action.payload.statusCode;
                    state.loading = false;
                    return;
                }
                state.data = action.payload.posts;
                state.totalPage = action.payload.pagination;    
                state.loading = false;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})

export default PostSlice.reducer;
