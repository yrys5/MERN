import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isFetching:false,
        error:false
    },
    reducers:{
            loginStart:(state)=>{
                state.isFetching=true
            },
            loginSucess:(state,action)=>{
                state.isFetching=false;
                state.currentUser=action.payload;
            },
            loginFailure:(state)=>{
                state.isFetching=false;
                state.error=true;
            },
            logoutSuccess:(state)=>{
                state.currentUser=NaN;
            },
        
    }
})

export const { loginStart,loginFailure,loginSucess,logoutSuccess } = userSlice.actions;
export default userSlice.reducer;