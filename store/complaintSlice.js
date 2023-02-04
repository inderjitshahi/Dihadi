import {createSlice} from '@reduxjs/toolkit';

const complaintSlice=createSlice({
    name:'complaints',
    initialState:{complaints:[]},
    reducers:{
        addComplaint(state,action){
            state.complaints=[...action.payload];
        },
    }
});

export const complaintActions=complaintSlice.actions;
export default complaintSlice;