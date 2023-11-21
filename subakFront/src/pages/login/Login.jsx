import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';

import shared from '../../styles/shared';
import styles from '../../styles/login/signUp';

import Alert from '../components/Alert';

const Login = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [email, setEmail] = useState(''); //이메일
  const [password, setPassword] = useState(''); //비밀번호

  // 이메일, 비밀번호 정규식
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

  // 이메일, 비밀번호 유효성 검사
  const emailCheck = (emailValue) => {
    return emailRegEx.test(emailValue);
  }

  const passwordCheck = (passwordValue) => {
    return passwordRegEx.test(passwordValue);
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={shared.container}>
        <TouchableOpacity
          style={[shared.backButton, styles.backButton]}
          onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>안녕하세요!</Text>
        <Text style={styles.headerText}>이메일과 비밀번호로 로그인해주세요.</Text>
        <Text style={styles.text}>
          휴대폰 번호는 안전하게 보관되며 이웃들에게 공개되지 않아요.
        </Text>
        <View style={{marginTop: 10}}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setEmail(text)}
            value={email}
            inputMode="email"
            keyboardType="email-address"
            placeholder="이메일 주소"
            placeholderTextColor="#676c74"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => setPassword(text)}
            value={password}
            inputMode="text"
            placeholder="비밀번호"
            placeholderTextColor="#676c74"
            secureTextEntry={true}
          />
          {!passwordCheck(password) && password.length > 0 && (
            <Text style={{color: '#dc645b'}}>
              비밀번호는 8자 이상 20자 미만이며{'\n'}영문, 숫자, 특수문자를 포함해야
              합니다.
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            axios.post(`http://${Config.DB_IP}/user/sign-in`, {
              email: email,
              password: password,
            }, {
              timeout: 1000,
            }
            ).then(response => { console.log(response.data); })
            .catch(error => { 
                if (error.response) { // 요청은 성공했으나 응답은 실패
                  console.log(error.response.status); 
                } else if (error.request) { // timeout으로 요청 실패
                  setAlertMessage('서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.'); // 오류 메시지
                  setShowAlert(true); // 오류 알림창
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 6000); // 6초 후 알림창 사라짐
                } else { // 기타 오류 발생
                  console.log('Unexpected error', error.message);
                }
             }
          )
          }}
          disabled={!(emailCheck(email) && passwordCheck(password))}>
          <Text
            style={[
              styles.startText,
              emailCheck(email) && passwordCheck(password)
                ? styles.enabled
                : styles.disabled,
            ]}>
            로그인 하기
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.text2]}>
          이메일 또는 비밀번호를 잊으셨나요?
        </Text>
        {/* <TouchableOpacity onPress={() => console.log('이메일 찾기 버튼 클릭')}> */}
        <TouchableOpacity onPress={() => {
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 6000);
        }}>
          <Text style={styles.hyperText}>이메일 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('비밀번호 찾기 버튼 클릭')}>
          <Text style={styles.hyperText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {showAlert && <Alert message={alertMessage} />}
    </View>
  );
};

export default Login;