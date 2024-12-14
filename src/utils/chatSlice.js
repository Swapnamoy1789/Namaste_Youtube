import { createSlice } from "@reduxjs/toolkit";
import { OFFSET_LIVE_COUNT } from "./constants";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        messages:[],
    },
    reducers:{
        addmessage:(state,action) => {
            state.messages.splice(OFFSET_LIVE_COUNT,1);
            state.messages.unshift(action.payload);
        },
    },
})

export const {addmessage} = chatSlice.actions;
export default chatSlice.reducer;
