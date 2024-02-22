import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

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
    position: 'absolute', // 화면 하단에 위치
    bottom: 0,
    
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 8,
    backgroundColor: colorPalette.background,
  },
  mainText: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  textInput: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    width: 'auto'
  },
});

export default styles;