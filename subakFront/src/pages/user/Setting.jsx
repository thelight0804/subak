import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/user/setting';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setPhone, setEmail, setAddress, setLogined, setToken } from '../../data/store/userSlice';
import storeStorageData from '../../data/asyncStorage/setStorageData';

const Setting = ({navigation}) => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState('한국어');

  return (
    <>
      <View style={shared.container}>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>설정</Text>
          <View style={shared.iconButton}></View>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={[shared.inlineContainer, styles.listButton]} onPress={() => console.log("공지사항")}>
            <Text style={[shared.text, styles.text]}>공지사항</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[shared.inlineContainer, styles.listButton, styles.languageBox]} onPress={() => console.log("언어 설정")}>
            <Text style={[shared.text, styles.text]}>언어 설정</Text>
            <Text style={[shared.text, styles.text, styles.languageText]}>{language}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[shared.inlineContainer, styles.listButton]} 
            onPress={() => {
              logOut(userData, dispatch)
              navigation.navigate('LoginStack', {screen: 'Start'});
            }}
          >
            <Text style={[shared.text, styles.text]}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[shared.inlineContainer, styles.listButton]} onPress={() => console.log("탈퇴하기")}>
            <Text style={[shared.text, styles.text]}>탈퇴하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
};


const logOut = (userData, dispatch) => {
  // 로그아웃
  dispatch(setName(''));
  dispatch(setPhone(''));
  dispatch(setEmail(''));
  dispatch(setAddress(''));
  dispatch(setLogined(false));
  dispatch(setToken(''));
  storeStorageData('userData', userData);

  console.log(userData);
}

export default Setting;