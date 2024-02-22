import {TouchableOpacity, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {shared} from '../../styles/shared';
import styles from '../../styles/review/buyerReview';

import CoverImage from '../../assets/image/thank_you2.png';

const SellerReview = ({navigation, route}) => {
  const buyerName = route.params.buyerName; // 구매자 이름
  const postTitle = route.params.postTitle; // 게시글 제목
  const sellerReview = route.params.sellerReview; // 판매자 리뷰

  return (
    <>
      <View style={shared.container}>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            // TODO: 화면 바깥으로 나가기
            onPress={() => navigation.navigate('ItemHistoryList')}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={shared.iconButton}></View>
        </View>
        <View>
          <Text style={styles.header}>{`${buyerName}님에게`}</Text>
          <Text style={styles.header}>따뜻한 후기를 보냈어요.</Text>
          <Text style={styles.grayText}>{`${buyerName}님과 ${postTitle}을 거래했어요.`}</Text>
          <ReviewCard review={sellerReview} />
        </View>
      </View>
    </>
  );
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
  );
};

export default SellerReview;
