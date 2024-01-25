// 이메일 찾기 페이지
import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';

import { shared } from '../../styles/shared';
import styles from '../../styles/login/findEmail';
import Alert from '../components/Alert';

const FindEmail = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [name, setName] = useState(''); // 본명
  const [phone, setPhone] = useState(''); // 휴대폰 번호
  const [findEmail, setFindEmail] = useState(''); // 찾은 이메일

  /**
   * 이메일을 찾는 함수
   */
  const handleFindEmail = () => {
    axios.post(`http://${Config.DB_IP}/user/email`, {
      name: name,
      phone: phone,
    }, {
      timeout: 2000,
    }
    ).then(response => {
      if (response.status === 200) {
        if (response.data) {
          setFindEmail(response.data); // 찾은 이메일 저장
          navigation.navigate('FindedEmail', {name: name, email: findEmail}); // 페이지 이동
        }
        else {
          setPhone(''); // 휴대폰 번호 초기화
          setAlertMessage('일치하는 이메일이 없습니다.');
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
        setAlertMessage(`${error.response.data}`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('FindEmail error.response', error.response);
      } else if (error.request) {
        // timeout으로 요청 실패
        setAlertMessage(
          '서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.',
        ); // 오류 메시지
        setShowAlert(true); // 오류 알림창
        setTimeout(() => {
          setShowAlert(false);
        }, 6000); // 6초 후 알림창 사라짐
      } else {
        // 기타 오류 발생
        setAlertMessage(`오류가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('FindEmail Unexpected error', error.message);
      }
    }
  )

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
        <Text style={styles.headerText}>이름과 휴대폰 번호로 이메일을 찾습니다.</Text>

        <View style={{marginTop: 10}}>
          <TextInput
            style={[
              shared.blankTextInput,
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
              shared.blankTextInput,
              !phoneCheck(phone) && phone.length > 0 && {borderColor: '#dc645b', borderWidth: 1}
            ]}
            onChangeText={text => setPhone(text)}
            value={phone}
            inputMode="numeric"
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            placeholderTextColor="#676c74"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleFindEmail}
          disabled={!(nameCheck(name) && phoneCheck(phone))}>
          <Text
            style={[ 
              styles.startText,
              nameCheck(name) && phoneCheck(phone) ? styles.enabled : styles.disabled,
            ]}>
            이메일 찾기
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      
      {showAlert && <Alert message={alertMessage} />}
    </View>
  )
}

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

export default FindEmail;