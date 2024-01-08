import {StyleSheet} from 'react-native';
import { colorPalette } from '../shared';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    zIndex: 1,
    width: '110%', // 부모 너비를 기준으로
  },
  text: {
    color: colorPalette.white,
    fontSize: 14,
  },

  // 메인 이미지
  imageContainer: {
    width: width,
    height: height * 0.4, // 화면의 40%만 차지
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // 프로필 정보
  titleContainer: { // 작성자, 메너온도 컨테이너
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,

    borderBottomWidth: 1.5,
    borderBottomColor: '#2b2b2d',
  },
  profileContainer: { // 프로필 사진, 작성자 컨테이너
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileNameContainer: { // 작성자 이름, 주소 컨테이너
    marginLeft: 10,
  },
  profileImage: { // 프로필 사진
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textGray: {
    color: colorPalette.gray,
  },
  tempContainer: { // 매너 온도 컨테이너
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: { // 매너 온도 수치
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: 3,
  },
  tempEmoji: {
    fontSize: 20,
  },
  tempBar: { // 빈 매너 온도 바
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#33373c",
    marginLeft: 10,
    margin: 3,
  },
  tempColorBar: { // 채워진 매너 온도 바
    position: 'absolute', // 매너 온도 바를 덮어씌우기
    backgroundColor: "#33373c",
  },
  tempText: { // 매너온도 텍스트
    fontSize: 12,
    color: colorPalette.gray,
    textAlign: 'right',
    textDecorationLine: 'underline', // 밑줄
  },

  // 게시글 내용
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 5,
  },
  postDateTime: {
    paddingBottom: 5,
    fontSize: 12,
  },

  // footer
  footer: { // footer 컨테이너
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    borderTopWidth: 1.5,
    borderTopColor: "#2b2b2d",
  },
  heartContainer: { // 좋아요, 가격 컨테이너
    flexDirection: "row",
    alignItems: "center",
  },
  heart: { // 좋아요
    paddingRight: 10,
    borderRightWidth: 1.5,
    borderRightColor: "#2b2b2d",
  },
  price: { // 가격
    color: colorPalette.white,
    fontSize: 16,
    fontWeight: "bold",

    paddingLeft: 10,
  },
  buttonText: { // 구매하기 버튼
    color: colorPalette.white,
    fontSize: 14,
    fontWeight: "bold",
  }
})

export default styles;