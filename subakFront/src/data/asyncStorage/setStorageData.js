import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * userData를 AsyncStorage에 저장합니다.
 * @param {Object} data userData
 * @param {String} key AsyncStorage에 저장할 Key
 * @returns {log} 저장 성공 여부
 */
const setStorageData = async (data, key) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);

    // 테스트용 로그
    const retrievedData = await AsyncStorage.getItem(key);
    return console.log('setStorageData Success: ', retrievedData);
  } catch (e) {
    return console.error('setStorageData Error:', e);
  }
};

export default setStorageData;