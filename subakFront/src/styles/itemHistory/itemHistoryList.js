import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  header: {
    color: colorPalette.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  profileImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 50,
  },
})

export default styles;