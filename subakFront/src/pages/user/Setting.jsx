import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/user/setting';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setPhone, setEmail, setAddress, setLogined, setToken } from '../../data/store/userSlice';
import storeStorageData from '../../data/asyncStorage/setStorageData';
import logoutUser from '../../data/store/logoutUser';

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

          <TouchableOpacity style={[shared.inlineContainer, styles.listButton, styles.languageContainer]} onPress={() => console.log("언어 설정")}>
            <Text style={[shared.text, styles.text]}>언어 설정</Text>
            <Text style={[shared.text, styles.text, styles.languageText]}>{language}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[shared.inlineContainer, styles.listButton]} 
            onPress={() => {
              navigation.navigate('LoginStack', {screen: 'Start'});
              logoutUser(dispatch);
            }}
          >
            <Text style={[shared.text, styles.text]}>로그아웃</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[shared.inlineContainer, styles.listButton]} onPress={() => console.log("탈퇴하기")}>
            {/* 회원 탈퇴는 PATCH /user/{email}로 해야 합니다 */}
            <Text style={[shared.text, styles.text]}>탈퇴하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
};

export default Setting;