import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/review/buyerReview';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

import CoverImage from '../../assets/image/thank_you.png';

const BuyerReview = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const postId = route.params.postId; // 게시글 아이디

  const [isSeller, setIsSeller] = useState(false); // 판매자 여부

  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [review, setReview] = useState({}); // 리뷰 데이터

  // 리뷰 데이터 불러오기
  useEffect(() => {
    fetchReview();
  }, []);
  
  /**
   * 리뷰 데이터를 불러오는 함수
   */
  const fetchReview = () => {
    axios.get(`http://${Config.DB_IP}/review/${postId}`,
      {headers: {
        'Authorization': `Bearer ${userData.token}` // 토큰 값
      },
      timeout: 2000 // 타임아웃
      }
    )
    .then(response => {
      setReview(response.data); // 리뷰 데이터 저장
      setIsSeller(response.data.sellerId === userData.id); // 판매자 여부 저장
      setIsLoading(false); // 로딩 종료
  })
    .catch(error => { 
      if (error.response) { // 요청은 성공했으나 응답은 실패
        setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('fetchReview error.response', error.response.data);
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

  /**
   * 구매자 리뷰 작성 여부 확인 함수
   */
  const getIsBuyerReview = () => {
    axios.get(`http://${Config.DB_IP}/reviews/${postId}/buyer-status`,
      {headers: {
        'Authorization': `Bearer ${userData.token}` // 토큰 값
      },
      timeout: 2000 // 타임아웃
      }
    )
    .then(response => {
      setIsBuyerReview(response.data);
  })
    .catch(error => {
      console.log('getIsBuyerReview error : ', error.message);
    });
  }

  /**
   * 판매자 리뷰 작성 여부 확인 함수
   */
  const getIsSellerReview = () => {
    axios.get(`http://${Config.DB_IP}/reviews/${postId}/seller-status`,
      {headers: {
        'Authorization': `Bearer ${userData.token}` // 토큰 값
      },
      timeout: 2000 // 타임아웃
      }
    )
    .then(response => {
      setIsSellerReview(response.data);
  })
    .catch(error => {
      console.log('getIsSellerReview error : ', error.message);
    });
  }

  if (isLoading) {
    // 로딩 중일 경우
    return <Loading />;
  } else if ( // 리뷰가 없을 경우
    (isSeller && review.buyerReview.length === 0) ||
    (!isSeller && review.sellerReview.length === 0)
  ) {
    return (
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
          <Text style={styles.header}>
            {`아직 ${isSeller ? review.buyerName : review.sellerName}님이`}
          </Text>
          <Text style={styles.header}>후기를 작성하지 않았어요.</Text>
          <Text style={styles.grayText}>
            {`${isSeller ? review.buyerName : review.sellerName}님이 후기를 작성할 때까지 기다려주세요.`}
          </Text>
        </View>
        <View style={styles.footer}>
          {(isSeller && review.sellerReview.length !== 0) ||
          (!isSeller && review.buyerReview.length !== 0) ? ( // 판매자 후기가 있을 경우
            <TouchableOpacity
              style={[shared.redButton, styles.button]}
              onPress={() =>
                navigation.navigate('SellerReview', {
                  buyerName: isSeller ? review.buyerName : review.sellerName,
                  postTitle: review.postTitle,
                  sellerReview: isSeller ? review.sellerReview : review.buyerReview,
                })
              }>
              <Text style={shared.text}>보낸 후기 보기</Text>
            </TouchableOpacity>
          ) : (
            // 판매자 후기가 없을 경우
            <TouchableOpacity
              style={[shared.redButton, styles.button]}
              onPress={() =>
                navigation.navigate('NewReview', {
                  postId: postId,
                  postTitle: review.postTitle,
                  buyerName: isSeller ? review.buyerName : review.sellerName,
                })
              }>
              <Text style={shared.text}>후기 작성하기</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    // 리뷰가 있을 경우
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
            <Text style={styles.header}>
              {`${isSeller ? review.buyerName : review.sellerName}님이 보낸`}
            </Text>
            <Text style={styles.header}>따뜻한 후기가 도착했어요.</Text>
            <Text style={styles.grayText}>
              {`${isSeller ? review.buyerName : review.sellerName}님과 ${review.postTitle}을 거래했어요.`}
            </Text>
            <ReviewCard
              review={isSeller ? review.buyerReview : review.sellerReview}
            />
          </View>
          <View style={styles.footer}>
          {(isSeller && review.sellerReview.length !== 0) ||
          (!isSeller && review.buyerReview.length !== 0) ? ( // 판매자 후기가 있을 경우
              <TouchableOpacity
                style={[shared.redButton, styles.button]}
                onPress={() =>
                  navigation.navigate('SellerReview', {
                    buyerName: isSeller ? review.buyerName : review.sellerName,
                    postTitle: review.postTitle,
                    sellerReview: isSeller ? review.sellerReview : review.buyerReview,
                  })
                }>
                <Text style={shared.text}>보낸 후기 보기</Text>
              </TouchableOpacity>
            ) : (
              // 판매자 후기가 없을 경우
              <TouchableOpacity
                style={[shared.redButton, styles.button]}
                onPress={() =>
                  navigation.navigate('NewReview', {
                    postId: postId,
                    postTitle: review.postTitle,
                    buyerName: isSeller ? review.buyerName : review.sellerName,
                  })
                }>
                <Text style={shared.text}>후기 작성하기</Text>
              </TouchableOpacity>
            )}
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