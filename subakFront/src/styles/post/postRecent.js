// Login component styleSheet
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

  // 게시물 내용
  postContent: {
    marginTop: 20,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 10,

    marginRight: 10,
  },

  // 가격 입력
  inputContainer: {
    marginTop: 10,
  },
  wonText: {
    position: 'absolute',
    width: '100%',
    paddingRight: 10,
    textAlign: 'right',
  },

  // footer
  footer: {
    position: 'absolute',
    flex: 1,
    backgroundColor: colorPalette.background,
    width: '100%',
    bottom: 0,
  },
  button: { // 끌어올리기 버튼
    margin: 10,
  },
  buttonText: {
    color: colorPalette.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;