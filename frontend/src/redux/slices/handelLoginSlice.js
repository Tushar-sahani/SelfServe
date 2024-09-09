import { createSlice } from "@reduxjs/toolkit";

const handelLoginSlice = createSlice({
    name:"loginModel",
    initialState:{
        isOpen:false,
    },
    reducers:{
        handelModal:(state,action)=>{
            state.isOpen = action.payload; 
        }
    }
})

export const {handelModal} = handelLoginSlice.actions;
export default handelLoginSlice.reducer;