import { createSlice } from '@reduxjs/toolkit'

// 초기 상태
const initialState = {
  name: '', // 이름
  id: '', // 유저 고유 id
  phone: '', // 전화번호
  email: '', // 이메일
  address: '', // 주소
  logined: false, // 로그인 여부
  mannerScore: 0, // 매너 온도
  image: '', // 프로필 사진
  token: '', // JWT 토큰
};

const userData = createSlice({
  name : 'userData',
  initialState,
  reducers: {
    login(state, action) { // 로그인 정보를 저장
      return action.payload;
    },
    logout(state) { // 초기 상태로 설정
      return initialState;
    },
  }
})

export const {login, logout} = userData.actions;

export default userData;