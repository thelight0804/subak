// 비밀번호 찾기 사이트
import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';

import shared from '../../styles/shared';
import styles from '../../styles/login/findEmail';
import Alert from '../components/Alert';

const SignUp = ({ navigation, route }) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [name, setName] = useState(''); // 본명
  const [phone, setPhone] = useState(''); // 휴대폰 번호
  const [email, setEmail] = useState(''); // 이메일
  const [newPassword, setNewPassword] = useState(''); // 비밀번호


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
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView style={shared.container}>
        <TouchableOpacity
          style={[shared.backButton, styles.backButton]}
          onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>이름과 휴대폰 번호로</Text>
        <Text style={styles.headerText}>비밀번호를 재설정합니다.</Text>
        <Text style={styles.text}>
          정보를 입력하면 비밀번호를 재설정 할 수 있어요.
        </Text>
        <View style={{marginTop: 10}}>
          <TextInput
            style={[
              styles.textInput,
              !nameCheck(name) && name.length > 0 && {borderColor: '#dc645b', borderWidth: 1},
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
              !phoneCheck(phone) &&  phone.length > 0 && {borderColor: '#dc645b', borderWidth: 1},
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
              !emailCheck(email) && email.length > 0 && {borderColor: '#dc645b', borderWidth: 1},
            ]}
            onChangeText={text => setEmail(text)}
            value={email}
            inputMode="email"
            keyboardType="email-address"
            placeholder="이메일 주소"
            placeholderTextColor="#676c74"
          />

          {emailCheck(email) &&
            nameCheck(name) &&
            phoneCheck(phone) && ( // 이메일, 이름, 휴대폰 번호 유효성 검사 통과 시
              <>
                <TextInput
                  style={[
                    styles.textInput,
                    !passwordCheck(newPassword) && 
                    newPassword.length > 0 && 
                    {
                      borderColor: '#dc645b',
                      borderWidth: 1,
                    },
                  ]}
                  onChangeText={text => setNewPassword(text)}
                  value={newPassword}
                  inputMode="text"
                  placeholder="변경할 비밀번호"
                  placeholderTextColor="#676c74"
                  secureTextEntry={true}
                />
                {!passwordCheck(newPassword) && newPassword.length > 0 && (
                  <Text style={{color: '#dc645b'}}>
                    비밀번호는 8자 이상 20자 미만이며{'\n'}영문, 숫자, 특수문자를 포함해야 합니다.
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    axios
                      .post(`http://${Config.DB_IP}/password`,
                        {
                          email: email,
                          newPassword: newPassword,
                          name: name,
                          phone: phone,
                        },
                        {timeout: 2000},
                      )
                      .then(response => {
                        if (response.status === 200) {
                          console.log(response.status);
                        }
                      })
                      .catch(error => {
                        if (error.response) {
                          // 요청은 성공했으나 응답은 실패
                          setAlertMessage(`오류가 발생했습니다. \n[${error.response.status}]`);
                          setShowAlert(true);
                          setTimeout(() => {
                            setShowAlert(false);
                          }, 6000);
                          console.log('SignUp error.response', error.response);
                        } else if (error.request) {
                          // timeout으로 요청 실패
                          // 오류 Toast
                          setAlertMessage('서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.');
                          setShowAlert(true);
                          setTimeout(() => {
                            setShowAlert(false);
                          }, 6000);
                        } else {
                          // 기타 오류 발생
                          setAlertMessage(`오류가 발생했습니다. \n[${error.message}]`);
                          setShowAlert(true);
                          setTimeout(() => {
                            setShowAlert(false);
                          }, 6000);
                          console.log('SignUp Unexpected error', error.message);
                        }
                      });
                  }}
                  disabled={!(emailCheck(email) && passwordCheck(newPassword) && nameCheck(name) && phoneCheck(phone))}>
                  <Text
                    style={[
                      styles.startText,
                      emailCheck(email) && passwordCheck(newPassword) && nameCheck(name) && phoneCheck(phone)
                        ? styles.enabled
                        : styles.disabled,
                    ]}>
                    비밀번호 변경하기
                  </Text>
                </TouchableOpacity>
              </>
            )}
        </View>
      </KeyboardAwareScrollView>
      {showAlert && <Alert message={alertMessage} />}
    </View>
  );
};

export default SignUp;