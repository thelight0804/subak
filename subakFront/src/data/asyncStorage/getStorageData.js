import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * AsyncStorage에서 userData를 가져옵니다.
 * @param {String} key AsyncStorage에 저장할 Key
 * @returns {Promise} 얻은 userData
 * @returns {Boolean} 실패 시 false
 */
const getStorageData = async (key) => {
  AsyncStorage.getItem(key)
    .then((data) => {
      return data
    })
    .catch((e) => {
      return false
    })
};

export default getStorageData;