import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import setStorageData from '../../data/asyncStorage/setStorageData';
import loginUser from '../../data/store/loginUser';

import { shared } from '../../styles/shared';
import styles from '../../styles/login/login';

import Alert from '../components/Alert';

import { setName } from '../../data/store/userSlice';

const Login = ({ navigation }) => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [email, setEmail] = useState(''); //이메일
  const [password, setPassword] = useState(''); //비밀번호

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={shared.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            style={[shared.iconButton, styles.backButton]}
            onPress={() => navigation.goBack()}>
            <Ionicon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>안녕하세요!</Text>
        <Text style={styles.headerText}>이메일과 비밀번호로 로그인해주세요.</Text>
        <Text style={styles.text}>
          휴대폰 번호는 안전하게 보관되며 이웃들에게 공개되지 않아요.
        </Text>
        <View style={{marginTop: 10}}>
          <TextInput
            style={shared.blankTextInput}
            onChangeText={text => setEmail(text)}
            value={email}
            inputMode="email"
            keyboardType="email-address"
            placeholder="이메일 주소"
            placeholderTextColor="#676c74"
          />
          <TextInput
            style={shared.blankTextInput}
            onChangeText={text => setPassword(text)}
            value={password}
            inputMode="text"
            placeholder="비밀번호"
            placeholderTextColor="#676c74"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            axios.post(`http://${Config.DB_IP}/user/sign-in`, {
              email: email,
              password: password,
            }, {
              timeout: 2000,
            }
            ).then(response => { // 로그인 성공 했을 때
              const data = { // 서버 데이터를 유저 데이터 형식으로 변환
                name: response.data.name,
                id: response.data.memberId,
                phone: response.data.phoneNumber,
                email: response.data.email,
                address: response.data.address,
                logined: true,
                mannerScore: response.data.temp,
                image: response.data.profileImage,
                token: response.data.token,
              };
              loginUser(data, dispatch); // Redux에 저장
              navigation.navigate('FooterTabs');
            })
            .catch(error => { 
                if (error.response) { // 요청은 성공했으나 응답은 실패
                  setAlertMessage(`${error.response.data}`);
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 6000);
                  console.error('Login error.response', error.response.data);
                } else if (error.request) { // timeout으로 요청 실패
                  setAlertMessage('서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.'); // 오류 메시지
                  setShowAlert(true); // 오류 알림창
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 6000); // 6초 후 알림창 사라짐
                } else { // 기타 오류 발생
                  setAlertMessage(`오류가 발생했습니다. \n[${error.message}]`);
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 6000);
                  console.error('Login Unexpected error', error.message);
                }
             }
          )
          }}
          disabled={!emailCheck(email)}>
          <Text
            style={[
              styles.startText,
              emailCheck(email) && password ? styles.enabled : styles.disabled
            ]}>
            로그인 하기
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.text2]}>
          이메일 또는 비밀번호를 잊으셨나요?
        </Text>
        <TouchableOpacity onPress={() =>  navigation.navigate('FindEmail')}>
          <Text style={styles.hyperText}>이메일 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
          <Text style={styles.hyperText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {showAlert && <Alert message={alertMessage} />}
    </View>
  );
};

/**
 * 이메일 유효성 검사
 * @param {String} emailValue 이메일
 * @returns {Boolean} 이메일 형식이 맞으면 true, 아니면 false
 */
const emailCheck = (emailValue) => {
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  return emailRegEx.test(emailValue);
}

export default Login;