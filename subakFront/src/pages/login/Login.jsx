import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/shared';
import styles from '../../styles/login/login';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(''); //이메일
  const [password, setPassword] = useState(''); //비밀번호

  return (
    <KeyboardAwareScrollView style={shared.container}>
      <TouchableOpacity
        style={[shared.backButton, styles.backButton]}
        onPress={() => navigation.goBack()}>
        <Ionicon name="chevron-back" size={20} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerText}>안녕하세요!</Text>
      <Text style={styles.headerText}>
        이메일과 비밀번호로 로그인해주세요.
      </Text>
      <Text style={styles.text}>
        휴대폰 번호는 안전하게 보관되며 이웃들에게 공개되지 않아요.
      </Text>
      <View style={{marginTop: 10}}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setEmail(text)}
          value={email}
          inputMode="email"
          keyboardType='email-address'
          placeholder="이메일 주소 입력"
          placeholderTextColor="#676c74"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={text => setPassword(text)}
          value={password}
          inputMode="text"
          placeholder="비밀번호 입력"
          placeholderTextColor="#676c74"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        style={shared.button}
        onPress={() => console.log("인증문자 받기")}>
        <Text style={[styles.startText]}>인증문자 받기</Text>
      </TouchableOpacity>
      <Text style={[styles.text, styles.text2]}>
        이메일 또는 비밀번호를 잊으셨나요?
      </Text>
      <TouchableOpacity onPress={() => console.log('이메일 찾기 버튼 클릭')}>
        <Text style={styles.hyperText}>이메일 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('비밀번호 찾기 버튼 클릭')}>
        <Text style={styles.hyperText}>비밀번호 찾기</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default Login;