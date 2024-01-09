import { setName, setId, setPhone, setEmail, setAddress, setLogined, setMannerScore, setImage, setToken } from './userSlice';

/**
 * 유저 데이터에 로그인 정보를 저장합니다
 * @param {Object} userData Redux에 저장되어 있는 유저 데이터
 * @param {Function} dispatch Redux dispatch 함수
 * @returns {Object} userData
 */
const loginUser = (data, dispatch) => {
  dispatch(setName(data.name));
  dispatch(setId(data.memberId));
  dispatch(setPhone(data.phoneNumber));
  dispatch(setEmail(data.email));
  dispatch(setAddress(data.address));
  dispatch(setLogined(true));
  dispatch(setMannerScore(data.temp));
  dispatch(setImage(data.profileImage));
  dispatch(setToken(data.token));
}

export default loginUser;