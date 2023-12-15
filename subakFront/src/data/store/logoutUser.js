import { setName, setId, setPhone, setEmail, setAddress, setLogined, setMannerScore, setImage, setToken } from './userSlice';

/**
 * 유저 데이터를 제거하여 로그아웃 합니다.
 * @param {Function} dispatch Redux dispatch 함수
 * @returns {Object} userData
 */
const logoutUser = (dispatch) => {
  dispatch(setName(null));
  dispatch(setId(null));
  dispatch(setPhone(null));
  dispatch(setEmail(null));
  dispatch(setAddress(null));
  dispatch(setLogined(false));
  dispatch(setMannerScore(null));
  dispatch(setImage(null));
  dispatch(setToken(null));
}

export default logoutUser;