import { setName, setId, setPhone, setEmail, setAddress, setLogined, setMannerScore, setImage, setToken } from './userSlice';

/**
 * 유저 데이터에 로그인 정보를 저장합니다
 * @param {Object} userData Redux에 저장되어 있는 유저 데이터
 * @param {Function} dispatch Redux dispatch 함수
 * @returns {Object} userData
 */
const loginUser = (userData, dispatch) => {
  dispatch(setName(userData.name));
  dispatch(setId(userData.id));
  dispatch(setPhone(userData.phone));
  dispatch(setEmail(userData.email));
  dispatch(setAddress(userData.address));
  dispatch(setLogined(true));
  dispatch(setMannerScore(userData.mannerScore));
  dispatch(setImage(userData.image));
  dispatch(setToken(userData.token));
}

export default loginUser;