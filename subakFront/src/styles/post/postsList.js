import {StyleSheet} from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  // 메뉴 버튼
  menuButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 40,
    height: 40,
    marginBottom: 10,

    backgroundColor: '#171719',
    borderRadius: 8,
  },

  // 게시글 리스트
  content: {
    flex: 1,
  },
  postContainer: {
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
  postContentContainer: {
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
  heartCountContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  // 작성 완료 버튼
  newPost: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
  },
  newPostButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colorPalette.main,
    width: 100,
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
})

export default styles;