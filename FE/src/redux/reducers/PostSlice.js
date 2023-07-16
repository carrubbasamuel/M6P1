import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./LoginSlice";

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async (_, { getState, dispatch }) => {
    try {
      const state = getState();
      const ApiKey = state.login.userLogged.token; 
      const response = await axios.get('http://localhost:3003/posts', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + ApiKey,
        },
      });

      const { data: { posts } } = response; // Utilizza data destructuring per estrarre i dati dal response object
      return posts;
    } catch (error) {
        if(error.response.status === 401) dispatch(logout());
      throw error;
    }
  }
);



export const fetchNewPost = createAsyncThunk(
    'authors/fetchNewPost',
    async (post, { getState }) => {
        const user = getState().login.userLogged;
        const ApiKey = user.token;
        try {
            const response = await axios.post('http://localhost:3003/posted', post, {
                headers: {
                    'Content-Type': 'application/json',
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
            return posts;
        } catch (error) {
            console.log(error);
            getState().author.error = error;
            throw error; 
            
        }
    }
)




const initialState = {
    data: [],
    loading: false,
    error: null,
    tokenValidation: null,
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
                if(action.payload.statusCode === 401) {
                    state.tokenValidation = action.payload.statusCode;
                    state.loading = false;
                    return;
                }
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})

export default PostSlice.reducer;
