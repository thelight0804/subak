import {StyleSheet} from "react-native";

const shared = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 10,

    backgroundColor: '#dc645b',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default shared;