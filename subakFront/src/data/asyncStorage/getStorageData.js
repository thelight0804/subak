import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * AsyncStorage에서 userData를 가져옵니다.
 * @param {String} key AsyncStorage에 저장할 Key
 * @returns {Object} 얻은 userData
 * @returns {null} 실패 시 null
 */
const getStorageData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log('getStorageData:', jsonValue); // 데이터 로그 출력
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    // return jsonValue ? jsonValue : null;
  } catch (e) {
    return null;
  }
};

export default getStorageData;