import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  // content
  content: {
    flex: 6,
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    color: colorPalette.white,
    textAlign: 'center',
  },
  countryButton: {
    marginTop: 15,
    marginBottom: 15,
  },
  countryText: {
    fontWeight: 'bold',
  },

  // footer
  footer: {
    flex: 1,
  },
  startText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text2: {
    color: '#868b94'
  },
  hyperlink: {
    color: colorPalette.main,
  },

  // 국가 선택 modal
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
    backgroundColor: colorPalette.background,
    paddingTop: 24,
    paddingBottom: 24,
    top: '58%',
    borderRadius: 8,
  },
  modalText: {
    color: colorPalette.white,
    left: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: colorPalette.background,
    width: 300,
    height: 215.
  },
  select: {
    backgroundColor: 'rgba(34, 34, 34, 0.9)',
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colorPalette.white,
  },
});

export default styles;