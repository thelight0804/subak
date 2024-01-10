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
  // FIX: 테스트 계정으로 초기화
  // initialState : {
  //   name : '니지카', // 이름
  //   id : '0529', // 유저 고유 id
  //   phone : '01000000000', // 전화번호
  //   email : 'test@gmail.com', // 이메일
  //   address : '시모키타자와고등학교', // 주소
  //   logined : false, // 로그인 여부
  //   mannerScore : 36.5, // 매너 온도
  //   image : '../../assets/image/nijika.png', // 프로필 사진
  //   token : 'tokenabc', // JWT 토큰
  // },
  initialState,
  reducers: {
    login(state, action) {
      return action.payload; // 로그인 정보를 저장
    },
    logout(state) {
      return initialState; // 초기 상태로 설정
    },
  }
})

export const {login, logout} = userData.actions;

export default userData;