import { login } from './userSlice';

/**
 * 유저 데이터에 로그인 정보를 저장합니다
 * @param {Object} data 유저 데이터
 * @param {Function} dispatch Redux dispatch 함수
 * @returns {Object} userData
 */
const loginUser = (data, dispatch) => {
  // 초기 상태
  const initialState = {
    name: data.name, // 이름
    id: data.id, // 유저 고유 id
    phone: data.phone, // 전화번호
    email: data.email, // 이메일
    address: data.address, // 주소
    logined: true, // 로그인 여부
    mannerScore: data.mannerScore, // 매너 온도
    image: data.image, // 프로필 사진
    token: data.token, // JWT 토큰
  };
  // 로그인 정보를 저장
  dispatch(login(initialState));
}

export default loginUser;