import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  // 헤더
  backButton: {
    paddingBottom: 15,
  },
  headerText: {
    marginTop: 3,
    marginBottom: 3,
    color: colorPalette.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: colorPalette.main,
  },
})

export default styles;