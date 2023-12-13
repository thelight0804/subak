import { StyleSheet } from 'react-native';
import { colorPalette } from '../shared';


const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#37373a',
  },
  mainText: {
    fontSize: 16,
    paddingBottom: 8,
  },
  enabled: {
    color: colorPalette.gray,
  },
  content: {
    marginTop: 10,
  },
  profile: {
    position: 'relative', // 부모
    alignSelf: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 50, // 원형
  },
  cameraIcon: { // 카메라 아이콘
    position: 'absolute', // 자식
    top: '60%',
    left: '19%',
    width: 30,
    height: 30,
    borderRadius: 20, // 원형
  },
  textInput: { // 입력칸
    width: '100%',
    borderWidth: 1,
    borderColor: '#868b94',
    borderRadius: 8,
    paddingTop: 10,
    paddingLeft: 10,
    marginBottom: 10,
    color: colorPalette.white,
  },
})

export default styles;