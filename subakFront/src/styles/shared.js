import {StyleSheet} from "react-native";

const shared = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,

    backgroundColor: '#dc645b',
    borderRadius: 8,

    alignItems: 'center',
    fontWeight: 'bold',
  },
});

export default shared;