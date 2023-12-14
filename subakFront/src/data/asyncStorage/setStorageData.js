import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * userData를 AsyncStorage에 저장합니다.
 * @param {Object} value userData
 * @param {String} key AsyncStorage에 저장할 Key
 * @returns {Boolean} 저장 성공 여부
 */
const setStorageData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    const retrievedData = await AsyncStorage.getItem(key);
    console.log('setStorageData:', retrievedData); // 데이터 로그 출력
    return true;
  } catch (e) {
    return false;
  }
};

export default setStorageData;