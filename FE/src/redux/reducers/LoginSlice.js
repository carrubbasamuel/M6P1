

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


//Login
export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async (user) => {
        try {
            const response = await fetch('http://localhost:3003/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


//Register
export const fetchRegister = createAsyncThunk(
    'login/fetchRegister',
    async (user) => {
        try {
            const response = await fetch('http://localhost:3003/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            return data;

        }
        catch (error) {
            console.log(error);
        }


    }
)



const initialState = {
    userLogged: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('user');
            state.userLogged = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.userLogged = action.payload;
                state.loading = false;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})


export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
