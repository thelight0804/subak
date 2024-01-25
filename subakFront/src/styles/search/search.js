import { StyleSheet } from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
  },
  iconButton: {
    display: 'flex',
    paddingRight: 15,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '94%',
    backgroundColor: '#2a2e32',
    borderRadius: 8,
    paddingLeft: 10,
    color: colorPalette.white,
  },
  closeIcon: {
    position: 'absolute',
    right: 30,
    padding: 2,

    backgroundColor: colorPalette.gray,
    borderRadius: 50,
  },

  // 검색 결과
  searchResultContainer: {
    marginTop: 20,
  },
  // 검색 토글 버튼
  toggleContainer: { // 토글 컨테이너
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggle: { // 선택되지 않은 토글
    padding: 10,
    marginRight: 10,

    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: colorPalette.gray,

    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedToggle: { // 선택된 토글
    backgroundColor: '#cdd2de',
  },
  toggleText: { // 선택되지 않은 토글 텍스트
    color: colorPalette.white,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5,
  },
  selectedToggleText: { // 선택된 토글 텍스트
    color: 'black',
  },
  // 거래가능만 보기
  checkBoxContainer: {

  },
  circleIcon: { // 비워있는 원
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colorPalette.gray,
    marginRight: 10,
  },
  filledCircleIcon: { // 채워진 원
    borderWidth: 0,
    backgroundColor: colorPalette.main,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;