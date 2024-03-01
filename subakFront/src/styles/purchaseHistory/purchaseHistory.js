import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#37373a',
    marginBottom: 16,
  },
  mainText: {
    fontSize: 16,
    paddingBottom: 8,
  },

  // 관심목록이 비어있는 경우
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalette.background,
  },
  noPostsText: {
    color: colorPalette.gray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // 받은 후기 보기, 설정 버튼
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