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
  button: {
    width: 'auto',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,

    backgroundColor: colorMain,
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#2a2e32',
    borderRadius: 8,
    paddingLeft: 10,
  },
});

export default shared;