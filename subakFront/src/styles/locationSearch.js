// LocationSearch.jsx stylesheet
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    height: 50,
  },
  input: {
    width: '80%',
    backgroundColor: '#2a2e32',
    borderRadius: 8,
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  locationList: {
    flex: 8,
  },
  listText: {
    margin: 10,
    color: 'white',

  },
})

export default styles;