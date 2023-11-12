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
    backgroundColor: '#dc645b',
    width: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 8,
    fontWeight: 'bold',
  },
});

export default shared;