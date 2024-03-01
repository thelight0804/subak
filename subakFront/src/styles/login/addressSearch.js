// LocationSearch.jsx stylesheet
import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    height: 50,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: 60,
    padding: 2,

    backgroundColor: colorPalette.gray,
    borderRadius: 50,
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
    color: colorPalette.white,
  },
})

export default styles;