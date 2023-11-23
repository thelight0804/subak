// FindEmail.jsx stylesheet
import {StyleSheet} from "react-native";

// color palette
var colorBackground = '#212123';
var text = 'white';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  // 헤더
  backButton: {
    paddingBottom: 15,
  },
  headerText: {
    marginTop: 3,
    marginBottom: 3,
    color: text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: text,
    paddingTop: 15,
    paddingBottom: 15,
  },
  // 입력 칸
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#868b94',
    borderRadius: 8,
    paddingTop: 10,
    paddingLeft: 10,
    marginBottom: 10,
    color: text,
  },
  button: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,

    borderWidth: 1,
    borderColor: '#868b94',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    color: '#868b94',
  },
  enabled: {
    color: text,
  },
  // 이메일 & 비밀번호 찾기
  hyperText: {
    marginBottom: 5,
    color: text,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
})

export default styles;