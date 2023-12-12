import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 
 * @param {String} key AsyncStorage에 제거할 Key
 * @returns {Boolean} 제거 성공 여부
 */
const removeStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

export default removeStorageData;