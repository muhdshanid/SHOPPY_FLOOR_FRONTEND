import {createSlice} from '@reduxjs/toolkit'

const token = localStorage.getItem("token")
const userData = localStorage.getItem("user")
const user = userData ? JSON.parse(userData) : ""
const authReducer = createSlice({
    name:"authReducer",
    initialState:{
        userToken: token ? token : null,
        user : user ? user : null
    },
    reducers:{
        setAdminToken : (state,action) => {
            state.adminToken = action.payload
        },
        setUserToken:(state,action) => {
            state.userToken = action.payload
        },
        setUser:(state,action) => {
            state.user = action.payload
        },
        updateUser:(state,action) => {
            state.user = action.payload
        },
        logout:(state,action) => {
            localStorage.removeItem("user")
            localStorage.removeItem('token')
            localStorage.removeItem('cart')
            state.user = null;
            state.userToken = null
            
           
        }
    }
})

export const {setAdminToken,logout,setUserToken,setUser,updateUser} = authReducer.actions;

export default authReducer.reducer 