// signUp component styleSheet
import { StyleSheet } from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  // 헤더
  backButton: {
    paddingBottom: 15,
  },
  headerText: {
    marginTop: 3,
    marginBottom: 3,
    color: colorPalette.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: colorPalette.white,
    paddingTop: 15,
    paddingBottom: 15,
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
    color: colorPalette.white,
  },
  // 이메일 & 비밀번호 찾기
  hyperText: {
    marginBottom: 5,
    color: colorPalette.white,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});

export default styles;