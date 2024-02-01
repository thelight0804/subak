import { StyleSheet } from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  // 판매 내역이 없을 때
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostsText: {
    color: colorPalette.gray,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // 끌어올리기, 설정 버튼
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: '#2b2b2d',
  },
  recentButton: {
    flex: 1,
    marginTop: 0,
    marginRight: 10,
  },
  menuButton: {
    width: 40,
    marginTop: 0,
  },
})

export default styles;