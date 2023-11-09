// Index.jsx Stylesheet

import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  // content
  container: {
    flex: 1,
  },
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
    color: 'white',
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
  },
  text2: {
    color: '#868b94'
  },
  hyperlink: {
    color: '#dc645b',
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
    backgroundColor: '#212123',
    paddingTop: 24,
    paddingBottom: 24,
    top: '58%',
    borderRadius: 8,
  },
  modalText: {
    color: 'white',
    left: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: '#212123',
    width: 300,
    height: 215.
  },
  select: {
    backgroundColor: 'rgba(34, 34, 34, 0.9)',
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;