import {StyleSheet} from "react-native";

// color palette
var colorBackground = '#212123';
var text = 'white';
var grayText = '#868b94';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 8,
    position: 'absolute', // 화면 하단에 위치
    bottom: 0,
  },
  button: {
    width: 'auto',
    padding: 10,
    marginBottom: 3,

    backgroundColor: colorBackground,
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;