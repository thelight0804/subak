import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 
 * @param {String} key AsyncStorage에 제거할 Key
 * @returns {Boolean} 수행 성공 여부
 */
const removeStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return console.log('removeStorageData Success: ', key);
  } catch (e) {
    return console.error('removeStorageData Error:', e);
  }
};

export default removeStorageData;