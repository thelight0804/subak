import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import shared from '../../styles/shared';
import styles from '../../styles/login/login';

const Login = () => {
  const [email, setEmail] = useState(''); //이메일
  const [password, setPassword] = useState(''); //비밀번호

  return (
    <KeyboardAwareScrollView style={shared.container}>
      <Text style={styles.text}>안녕하세요!</Text>
      <Text style={styles.text}>이메일과 비밀번호로 로그인해주세요.</Text>
      <Text style={styles.text}>
        휴대폰 번호는 안전하게 보관되며 이웃들에게 공개되지 않아요.
      </Text>
      <TextInput
        style={[shared.textInput, styles.text]}
        onChangeText={text => setEmail(text)}
        value={email}
        inputMode="text"
        placeholder="이메일 주소 입력"
        placeholderTextColor="#676c74"
      />
      <TextInput
        style={[shared.textInput, styles.text]}
        onChangeText={text => setPassword(text)}
        value={password}
        inputMode="text"
        placeholder="비밀번호 입력"
        placeholderTextColor="#676c74"
      />
      <TouchableOpacity
        style={shared.button}
        onPress={() => navigation.navigate('LocationSearch')}>
        <Text style={[styles.text, styles.startText]}>인증문자 받기</Text>
      </TouchableOpacity>
      <Text style={[styles.text, styles.text2]}>
        이메일 또는 비밀번호를 잊으셨나요?
      </Text>
      <TouchableOpacity onPress={() => console.log('이메일 찾기 버튼 클릭')}>
        <Text style={styles.text}>이메일 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('비밀번호 찾기 버튼 클릭')}>
        <Text style={styles.text}>비밀번호 찾기</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default Login;