import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:"filter",
    initialState:{
        filterText:"RecentPost"
    },
    reducers:{
        updateFilter:(state,action)=>{
            state.filterText = action.payload; 
        }
    }
})

export const {updateFilter} = filterSlice.actions;
export default filterSlice.reducer;