import {StyleSheet} from "react-native";

// color palette
var colorBackground = '#212123';
var text = 'white';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const shared = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colorBackground,
  },
  text: {
    color: text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  redButton: {
    width: 'auto',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,

    backgroundColor: colorMain,
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  grayButton: {
    width: 'auto',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,

    backgroundColor: '#37373a',
    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    display: 'flex',
    paddingBottom: 15,
    paddingRight: 15
  },
  textInput: {
    width: '100%',
    backgroundColor: '#2a2e32',
    borderRadius: 8,
    paddingLeft: 10,
  },
});

export default shared;