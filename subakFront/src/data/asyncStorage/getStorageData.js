import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStorage에서 userData를 가져옵니다.
 * @param {String} key AsyncStorage에 저장할 Key
 * @returns {log} 수행 성공 여부
 */
const getStorageData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log('getStorageData Success:', jsonValue); // 테스트용 로그
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return console.error('setStorageData Error:', e);
  }
};

export default getStorageData;