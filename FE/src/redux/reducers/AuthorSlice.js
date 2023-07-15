import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchAuthors = createAsyncThunk(
    'authors/fetchAuthors',
    async () => {
        try {
            const response = await fetch('http://localhost:3003/posts');
            const data = await response.json();
            const { posts } = data;
            return posts;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchNewPost = createAsyncThunk(
    'authors/fetchNewPost',
    async (post, { getState }) => {
        const  user  = getState().login.userLogged;
        console.log(user);
        const { _id } = user.user;
        try {
            const response = await fetch('http://localhost:3003/posted/' + _id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchMyPosts = createAsyncThunk(
    'authors/fetchMyPosts',
    async (id) => {
        try {
            const response = await fetch('http://localhost:3003/MyPosts/' + id);
            const data = await response.json();
            const { posts } = data;
            return posts;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchLike = createAsyncThunk(
    'authors/fetchLike',
    async (id) => {
        try {
            const response = await fetch('http://localhost:3003/post/like/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)





const initialState = {
    data: [],
    loading: false,
    error: null
}

const authorSlice = createSlice({
    name: 'authors',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})


export default authorSlice.reducer;

