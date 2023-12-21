import {StyleSheet} from "react-native";
import { colorPalette } from "../shared";

const styles = StyleSheet.create({
  footer: {
    padding: 0,
  },
  inlineContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
  },
  // 게시글 리스트
  postBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: '#2b2b2d',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  postContentBox: {
    flex: 1, // 너비 채우기
  },
  title: {
    color: colorPalette.white,
    fontSize: 15,
    paddingTop: 3,
    paddingBottom: 3,
  },
  grayText: {
    color: colorPalette.gray,
  },
  price: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 3,
    paddingBottom: 3,
  },
  // 좋아요
  heartCountBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
})


export default styles;