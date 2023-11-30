import {createSlice} from '@reduxjs/toolkit'

const userData = createSlice({
  name : 'userData',
  initialState : {
    name : '',
    phone : '',
    email : '',
    address : '',
    token : false,
  },
  reducers: {
    setName : (state, action) => {
      state.name = action.payload
    },
    setPhone : (state, action) => {
      state.phone = action.payload
    },
    setEmail : (state, action) => {
      state.email = action.payload
    },
    setAddress : (state, action) => {
      state.address = action.payload
    },
    setToken : (state, action) => {
      state.token = action.payload
    },
  }
})

export const {setName, setPhone, setEmail, setAddress, setToken} = userData.actions;
export default userData;