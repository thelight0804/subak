// Login component styleSheet
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // 헤더
  backButton: {
    paddingBottom: 15,
  },
  headerText: {
    marginTop: 3,
    marginBottom: 3,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
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
    color: 'white',
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
  // 이메일 & 비밀번호 찾기
  startText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#868b94',
  },
});

export default styles;