import {configureStore, createSlice} from '@reduxjs/toolkit'

const userData = createSlice({
  name : 'userData',
  initialState : {
    name : 'user',
    phone : '',
    email : '',
    address : '',
    token : false,
  },
})

export default userData;