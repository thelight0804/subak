import { StyleSheet } from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '110%',
    height: '110%',
  },
  backDrop: { // 백드롭
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  contentContainer: {
    padding: 10,
    backgroundColor: colorPalette.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    position: 'absolute',
    width: '97%',
    bottom: 45,
  },
  line: { // 상단 라인
    borderBottomWidth: 4,
    borderRadius: 50,
    borderBottomColor: colorPalette.gray,
    width: 40,

    alignSelf: 'center', // 중앙 정렬
  },
  text: { // "가격" 텍스트
    color: colorPalette.white,
    fontSize: 18,
    fontWeight: 'bold',

    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
  },
  priceInputContainer: { // 가격 입력 컨테이너
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  priceInput: { // 가격 입력
    width: '45%',
    color: 'white',
  },

  // 푸터
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  grayButton: { // 초기화
    flex: 1,
    marginRight: 10,
  },
  redButton: { // 적용하기
    flex: 3,
    marginRight: 10,
  },
});

export default styles;