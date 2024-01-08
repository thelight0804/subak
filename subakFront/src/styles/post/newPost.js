import {StyleSheet} from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#c4c4c4',
    marginBottom: 61,
  },

  inlineContainer: {
    // 상단에 고정
    // position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: colorPalette.background,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 30,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#37373a',
  },
  mainText: {
    fontSize: 16,
    paddingBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  cameraButton: {
    width: 65,
    padding: 10,
    marginTop: 20,
    marginRight: 10,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: colorPalette.gray,
  },
  grayText: {
    color: colorPalette.gray,
    textAlign: 'center',
  },
  redText: {
    color: colorPalette.main,
    textAlign: 'center',
  },

  previewImageContainer: { // 미리보기 이미지 컨테이너
    position: 'relative',
    alignSelf: 'center',
  },
  closeIcon: { // 삭제 아이콘
    position: 'absolute', // 자식
    top: '15%',
    left: '70%',
  },
  previewImage: { // 미리보기 이미지
    width: 65,
    height: 65,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 10,
  },

  inputTag: {
    color: colorPalette.white,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  toggleContainer: { // 토글 컨테이너
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggle: { // 선택되지 않은 토글
    // width: 80,
    padding: 10,
    marginRight: 10,

    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: colorPalette.gray,
  },
  selectedToggle: { // 선택된 토글
    backgroundColor: '#cdd2de',
  },
  toggleText: { // 선택되지 않은 토글 텍스트
    color: colorPalette.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedToggleText: { // 선택된 토글 텍스트
    color: 'black',
  },
  alertContainer: {

  },
  alertText: {
    color: colorPalette.main,
    fontSize: 12,
    fontWeight: 'bold',
  },

  footer: {
    position: 'absolute',
    flex: 1,
    backgroundColor: colorPalette.background,
    width: '100%',
    bottom: 0,
  },
  button: { // 작성 완료 버튼
    margin: 10,
  },
  buttonText: {
    color: colorPalette.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default styles;