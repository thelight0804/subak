// 비밀번호 찾기 사이트
import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';

import { shared } from '../../styles/shared';
import styles from '../../styles/login/findEmail';
import Alert from '../components/Alert';

const SignUp = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [name, setName] = useState(''); // 본명
  const [phone, setPhone] = useState(''); // 휴대폰 번호
  const [email, setEmail] = useState(''); // 이메일
  const [newPassword, setNewPassword] = useState(''); // 비밀번호

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView style={shared.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            style={[shared.iconButton, styles.backButton]}
            onPress={() => navigation.goBack()}>
            <Ionicon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
                      .post(`http://${Config.DB_IP}/user/password`,
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
                          if (response.data) {
                            // TODO: 비밀번호 변경 백엔드 테스트
                            //입력값 초기화
                            setName('');
                            setPhone('');
                            setEmail('');
                            setNewPassword('');

                            // Toast 알림
                            setAlertMessage('비밀번호 변경이 완료되었습니다.\n다시 로그인 해주세요.');
                            setShowAlert(true);
                            setTimeout(() => {
                              setShowAlert(false);
                            }, 6000);
                          }
                        }
                      })
                      .catch(error => {
                        if (error.response) {
                          // 요청은 성공했으나 응답은 실패
                          setNewPassword('');
                          setAlertMessage(`${error.response.data}`);
                          setShowAlert(true);
                          setTimeout(() => {
                            setShowAlert(false);
                          }, 6000);
                          console.log('SignUp error.response', error.response);
                        } else if (error.request) {
                          // timeout으로 요청 실패
                          setNewPassword('');
                          // 오류 Toast
                          setAlertMessage('서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.');
                          setShowAlert(true);
                          setTimeout(() => {
                            setShowAlert(false);
                          }, 6000);
                        } else {
                          // 기타 오류 발생
                          setNewPassword('');
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

/**
 * 이름 유효성 검사
 * @param {String} nameValue 이름
 * @returns {Boolean} 이름 형식이 맞으면 true, 아니면 false
 */
const nameCheck = (nameValue) => {
  const nameRegEx = /^[가-힣a-zA-Zぁ-んァ-ン一-龯]{1,20}$/;
  return nameRegEx.test(nameValue);
}

/**
 * 전화번호 유효성 검사
 * @param {String} phoneValue 전화번호
 * @returns {Boolean} 전화번호 형식이 맞으면 true, 아니면 false
 */
const phoneCheck = (phoneValue) => {
  const phoneRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
  return phoneRegEx.test(phoneValue);
}

/**
 * 이메일 유효성 검사
 * @param {String} emailValue 이메일
 * @returns {Boolean} 이메일 형식이 맞으면 true, 아니면 false
 */
const emailCheck = (emailValue) => {
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  return emailRegEx.test(emailValue);
}

/**
 * 비밀번호 유효성 검사
 * @param {String} passwordValue 비밀번호
 * @returns {Boolean} 비밀번호 형식이 맞으면 true, 아니면 false
 */
const passwordCheck = (passwordValue) => {
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;
  return passwordRegEx.test(passwordValue);
}

export default SignUp;