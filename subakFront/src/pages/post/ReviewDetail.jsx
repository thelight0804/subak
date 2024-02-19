import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/likes/likesList';
import Loading from '../components/Loading';
import RenderPosts from '../components/RenderPosts';
import Alert from '../components/Alert';

const ReviewDetail = ({navigation}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const [isLoading, setIsLoading] = useStaCommaPricete(true); // 로딩 여부
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [review, setReview] = useState({}); // 리뷰 데이터

  useEffect(() => {
    // fetchReview();
    setIsLoading(false);
  }, []);

  /**
   * 관심 게시글 목록을 불러오는 함수
   */
  // const fetchReview = () => {
  //   axios.get(`http://${Config.DB_IP}/reviews/${route.params.postId}`,
  //     {headers: {
  //       'Authorization': `Bearer ${userData.token}` // 토큰 값
  //     },
  //     timeout: 2000 // 타임아웃
  //     }
  //   )
  //   .then(response => {
  //     if (response.data.length > 0) {
  //     const copyPosts = [...posts]
  //     const newPosts = [...response.data];
  //     setPosts([...copyPosts, ...newPosts]);
  //   }
  // })
  //   .catch(error => { 
  //     if (error.response) { // 요청은 성공했으나 응답은 실패
  //       setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 6000);
  //       console.log('fetchReview error.response', error.response);
  //     } else if (error.request) { // timeout으로 요청 실패
  //       setAlertMessage('서버와의 연결이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 6000);
  //     } else { // 기타 오류 발생
  //       setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 6000);
  //       console.log('fetchReview Unexpected error', error.message);
  //     }
  //   });
  // }

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

          <View style={styles.content}>
          </View>
        </View>
        {showAlert && <Alert message={alertMessage} />}
      </>
    )
  }
};

export default ReviewDetail;