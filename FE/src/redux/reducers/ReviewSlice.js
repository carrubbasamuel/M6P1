import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAddReview = createAsyncThunk(
    'review/fetchAddReview',
    (review, { getState }) => {
        const token = getState().login.userLogged.token;
        const response = axios.post('http://localhost:3003/addReview', review, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const { data } = response;
        return data;
    }
);

export const fetchGetReviews = createAsyncThunk(
    'review/fetchGetReviews',
    async (postId, { getState }) => {
        const token = getState().login.userLogged.token;
        try {
            const response = await axios.get(`http://localhost:3003/getReviews/${postId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw Error('Failed to fetch reviews.');
        }
    }
);



const initialState = {
    reviews: [],
    loading: false,
    error: null,
};


const reviewSlice = createSlice({
    name: 'review',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchGetReviews.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchGetReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchGetReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});



export default reviewSlice.reducer;
