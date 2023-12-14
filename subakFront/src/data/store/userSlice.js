import { createSlice } from '@reduxjs/toolkit'

const userData = createSlice({
  name : 'userData',
  // FIX: 테스트 계정으로 초기화
  initialState : {
    name : '니지카', // 이름
    id : '0529', // 유저 고유 id
    phone : '01000000000', // 전화번호
    email : 'test@gmail.com', // 이메일
    address : '시모키타자와고등학교', // 주소
    logined : false, // 로그인 여부
    mannerScore : 36.5, // 매너 온도
    image : '', // 프로필 사진
    token : '', // JWT 토큰
  },
  reducers: {
    setName(state, action){
      state.name = action.payload
    },
    setId(state, action){
      state.id = action.payload
    },
    setPhone(state, action){
      state.phone = action.payload
    },
    setEmail(state, action){
      state.email = action.payload
    },
    setAddress(state, action){
      state.address = action.payload
    },
    setLogined(state, action){
      state.logined = action.payload
    },
    setMannerScore(state, action){
      state.mannerScore = action.payload
    },
    setImage(state, action){
      state.image = action.payload
    },
    setToken(state, action){
      state.token = action.payload
    },
  }
})

export const {setName, setId, setPhone, setEmail, setAddress, setLogined, setMannerScore, setImage, setToken} = userData.actions;

export default userData;