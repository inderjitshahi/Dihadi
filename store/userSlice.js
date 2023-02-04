import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState:{user:{}},
    reducers:{
        updateUser(state,action){
            state.user={
                id:action.payload.id,
                name:action.payload.name,
                type:action.payload.type,
            };
        },
        removeUser(state){
            state.user={};
        }
    }
});

export const userActions=userSlice.actions;
export default userSlice;