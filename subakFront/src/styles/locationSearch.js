// LocationSearch.jsx stylesheet
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#2a2e32',
    borderRadius: 8,
  },
  button: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  locationList: {
    flex: 8,

  },
})

export default styles;