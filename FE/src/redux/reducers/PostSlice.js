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
      console.log(response);
      const { data: { posts } } = response; // Utilizza data destructuring per estrarre i dati dal response object
      return posts;
    } catch (error) {
        dispatch(logout());
      throw error;
    }
  }
);

// Resto del codice del tuo slice, reducers, ecc.
export const fetchNewPost = createAsyncThunk(
    'authors/fetchNewPost',
    async (post, { getState }) => {
        const user = getState().login.userLogged;
        console.log(user);
        const { _id } = user.user;
        try {
            const response = await axios.post('http://localhost:3003/posted/' + _id, post, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { data } = response; // Utilizza data destructuring per estrarre i dati dal response object
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const fetchMyPosts = createAsyncThunk(
    'authors/fetchMyPosts',
    async (id) => {
        try {
            const response = await axios.get('http://localhost:3003/MyPosts/' + id);
            const { data: { posts } } = response; 
            return posts;
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
