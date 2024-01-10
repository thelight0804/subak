import { setName, setId, setPhone, setEmail, setAddress, setLogined, setMannerScore, setImage, setToken } from './userSlice';

/**
 * 유저 데이터에 로그인 정보를 저장합니다
 * @param {Object} data 유저 데이터
 * @param {Function} dispatch Redux dispatch 함수
 * @returns {Object} userData
 */
const loginUser = (data, dispatch) => {
  dispatch(setLogined(true));
  dispatch(setName(data.name));
  dispatch(setId(data.id));
  dispatch(setPhone(data.phone));
  dispatch(setEmail(data.email));
  dispatch(setAddress(data.address));
  dispatch(setMannerScore(data.mannerScore));
  dispatch(setImage(data.image));
  dispatch(setToken(data.token));
}

export default loginUser;