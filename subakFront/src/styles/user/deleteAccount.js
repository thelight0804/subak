import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#37373a',
    marginBottom: 16,
  },
  headerText: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10,
  },

  mainText: {
    color: colorPalette.white,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  contentText: {
    color: colorPalette.white,
    fontSize: 13, 
    marginBottom: 15,
  },

  cancelButton: {
    padding: 10,
    marginRight: 10,

    borderWidth: 1,
    borderColor: '#868b94',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles;