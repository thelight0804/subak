import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/buyerReview';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

import CoverImage from '../../assets/image/thank_you.png';

const BuyerReview = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  // const [review, setReview] = useState({}); // 리뷰 데이터
  const [review, setReview] = useState({ // 테스트용 리뷰 데이터
    buyerName: "빛날빈",
    buyerProfileImage: "판매자 프로필 이미지",
    buyerReview: "제가 있는 곳까지 와서 거래했어요.",
    postTitle: "닌텐도 스위치 링피트 새상품",
    reviewStatus: "PENDING",
    sellerName: "카레",
    sellerProfileImage: "구매자 프로필 이미지",
    sellerReview: "친절하고 매너가 좋아요",
  });

  useEffect(() => {
    // fetchReview();
    setIsLoading(false);
  }, []);

  /**
   * 관심 게시글 목록을 불러오는 함수
   */
  const fetchReview = () => {
    axios.get(`http://${Config.DB_IP}/reviews/${route.params.postId}`,
      {headers: {
        'Authorization': `Bearer ${userData.token}` // 토큰 값
      },
      timeout: 2000 // 타임아웃
      }
    )
    .then(response => {
      setReview(response.data); // 리뷰 데이터 저장
      setIsLoading(false); // 로딩 종료
  })
    .catch(error => { 
      if (error.response) { // 요청은 성공했으나 응답은 실패
        setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('fetchReview error.response', error.response);
      } else if (error.request) { // timeout으로 요청 실패
        setAlertMessage('서버와의 연결이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      } else { // 기타 오류 발생
        setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('fetchReview Unexpected error', error.message);
      }
    });
  }

  if (isLoading) {
    return <Loading />
  }
  else {
    return (
      <>
        <View style={shared.container}>
          <View style={styles.inlineContainer}>
            <TouchableOpacity
              style={shared.iconButton}
              onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={shared.iconButton}></View>
          </View>
          <View>
            <Text style={styles.header}>{`${review.buyerName}님이 보낸`}</Text>
            <Text style={styles.header}>따뜻한 후기가 도착했어요.</Text>
            <Text style={styles.grayText}>{`${review.buyerName}님과 ${review.postTitle}을 거래했어요.`}</Text>
            <ReviewCard review={review.buyerReview} />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[shared.redButton, styles.button]}
              onPress={() =>
                navigation.navigate('SellerReview', {
                  buyerName: review.buyerName,
                  postTitle: review.postTitle,
                  sellerReview: review.sellerReview,
                })
              }>
              <Text style={shared.text}>보낸 후기 보기</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showAlert && <Alert message={alertMessage} />}
      </>
    );
  }
};

/**
 * 리뷰 카드 컴포넌트
 * @param {string} review 리뷰 내용
 */
const ReviewCard = ({review}) => {
  return (
    <View style={styles.reviewContainer}>
      <Image style={styles.image} source={CoverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{review}</Text>
      </View>
    </View>
  )
}

export default BuyerReview;