// LocationSearch.jsx stylesheet
import {StyleSheet} from "react-native";

// color palette
var colorBackground = '#212123';
var text = 'white';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    height: 50,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  locationList: {
    flex: 8,
  },
  listText: {
    marginTop: 10,
    marginBottom: 10,
    color: text,
  },
})

export default styles;