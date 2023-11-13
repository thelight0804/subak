import {StyleSheet} from "react-native";

const shared = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#212123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    width: 'auto',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,

    backgroundColor: '#dc645b',
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