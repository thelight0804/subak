import removeStorageData from '../asyncStorage/removeStorageData';
import { logout } from './userSlice';

/**
 * 유저 데이터를 로컬과 Redux에서 제거합니다.
 * @param {Function} dispatch Redux dispatch 함수
 */
const logoutUser = async (dispatch) => {
  dispatch(logout()); // Redux store에서 유저 데이터 제거
  await removeStorageData('userData'); // 로컬에서 유저 데이터 제거
}

export default logoutUser;