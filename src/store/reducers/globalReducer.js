import {createSlice} from '@reduxjs/toolkit'

const globalReducer = createSlice({
    name:"global",
    initialState:{
        showModal:false,
        status:""
    },
    reducers:{
        showModalReducer : (state,action) => {
            state.showModal = true
        },
        unShowModal:(state,action) => {
            state.status = action.payload
            state.showModal =false
        },
    }
})

export const {showModalReducer,unShowModal} = globalReducer.actions

export default globalReducer.reducer