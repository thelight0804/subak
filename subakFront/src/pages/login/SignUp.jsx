// 회원 가입 페이지
import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Ionicon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector, useDispatch} from 'react-redux';
import {
  setName as setUserName, 
  setPhone as setUserPhone, 
  setEmail as setUserEmail, 
  setAddress as setUserAddress, 
  setToken as setToken
} from '../../data/store/userSlice'

import shared from '../../styles/shared';
import styles from '../../styles/login/signUp';
import Alert from '../components/Alert';

const SignUp = ({ navigation, route }) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [name, setName] = useState(''); // 본명
  const [phone, setPhone] = useState(''); // 휴대폰 번호
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [address, setAddress] = useState(route.params.address); // 위치

  //Redux
  const userData = useSelector((state) => state.userData); // 로그인 여부
  const dispatch = useDispatch();


  // 입력 값 체크 정규식
  const nameRegEx = /^[가-힣a-zA-Zぁ-んァ-ン一-龯]{1,20}$/;
  const phoneRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;

  // 유효성 검사
  const nameCheck = (nameValue) => {
    return nameRegEx.test(nameValue);
  }
  
  const phoneCheck = (phoneValue) => {
    return phoneRegEx.test(phoneValue);
  }
  
  const emailCheck = (emailValue) => {
    return emailRegEx.test(emailValue);
  }

  const passwordCheck = (passwordValue) => {
    return passwordRegEx.test(passwordValue);
  }

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
        <Text style={styles.headerText}>이메일과 비밀번호로 가입해주세요.</Text>
        <Text style={styles.text}>
          휴대폰 번호는 안전하게 보관되며 이웃들에게 공개되지 않아요.
        </Text>
        <View style={{marginTop: 10}}>
          <TextInput
            style={[
              styles.textInput,
              !nameCheck(name) && name.length > 0 && {borderColor: '#dc645b', borderWidth: 1}
            ]}
            onChangeText={text => setName(text)}
            value={name}
            inputMode="text"
            placeholder="이름"
            placeholderTextColor="#676c74"
          />
          <TextInput
            style={[
              styles.textInput,
              !phoneCheck(phone) && phone.length > 0 && {borderColor: '#dc645b', borderWidth: 1}
            ]}
            onChangeText={text => setPhone(text)}
            value={phone}
            inputMode="numeric"
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            placeholderTextColor="#676c74"
          />
          <TextInput
            style={[
              styles.textInput,
              !emailCheck(email) && email.length > 0 && {borderColor: '#dc645b', borderWidth: 1}
            ]}
            onChangeText={text => setEmail(text)}
            value={email}
            inputMode="email"
            keyboardType="email-address"
            placeholder="이메일 주소"
            placeholderTextColor="#676c74"
          />
          <TextInput
            style={[
              styles.textInput,
              !passwordCheck(password) && password.length > 0 && {borderColor: '#dc645b', borderWidth: 1}
            ]}
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
            axios.post(`http://${Config.DB_IP}/user`,{
              email: email,
              password: password,
              name: name,
              phone: phone,
            },
            {timeout: 2000})
            .then(response => {
              //"status": 200
              //"name\":\"라라라\
              // "data": "sign-up success"
              if (response.status === 200) {
                dispatch(setUserName(name));
                dispatch(setUserPhone(phone));
                dispatch(setUserEmail(email));
                dispatch(setUserAddress(address));
                // dispatch(setToken(response.data.token));
                dispatch(setToken(ture));
                navigation.navigate('PostsList');
                // console.log(response.status)
              }
            })
            .catch(error => { 
              if (error.response) { // 요청은 성공했으나 응답은 실패
                if (error.response.data === '')
                setAlertMessage(`${error.response.data}`);
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 6000);
                console.log('SignUp error.response : ', error.response.data);
              } else if (error.request) { // timeout으로 요청 실패
                // 오류 Toast
                setAlertMessage('서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.');
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 6000);
              } else { // 기타 오류 발생
                setAlertMessage(`오류가 발생했습니다. \n[${error.message}]`);
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 6000);
                console.log('SignUp Unexpected error', error.message);
                }
            }
          )
          }}
          disabled={!(emailCheck(email) && passwordCheck(password) && nameCheck(name) && phoneCheck(phone))}>
          <Text
            style={[
              styles.startText,
              emailCheck(email) && passwordCheck(password) && nameCheck(name) && phoneCheck(phone)
                ? styles.enabled
                : styles.disabled,
            ]}>
            가입 하기
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {showAlert && <Alert message={alertMessage} />}
    </View>
  );
};

export default SignUp;