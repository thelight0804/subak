import {useState, useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/CategoryPosts';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import RenderPosts from '../components/RenderPosts';

const CategoryPosts = ({navigation, route}) => {
  const userToken = useSelector((state) => state.userData.token); // 유저 데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [noMore, setNoMore] = useState(false); // 더 이상 데이터가 없는지 확인
  const [page, setPage] = useState(1); // 페이지 번호

  const [posts, setPosts] = useState([]); // 게시글 목록
  const category = route.params.category; // 카테고리

  useEffect(() => {
    fetchpost(1, category);
    setIsLoading(false);
  }, []);

  // 화면이 포커스 되었을 때 실행되는 함수
  useFocusEffect(
    useCallback(() => {
      fetchpost(page, category);
    }, [])
  );

  /**
   * 카테고리 게시글 데이터 요청 함수
   */
  const fetchpost = useCallback((start, category) => {
    axios.get(`http://${Config.DB_IP}/posts/category/${category}?offset=${start}&limit=10`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      timeout: 2000
    })
      .then(response => {
          if (response.data.length > 0) {
          const copyPosts = [...posts]
          const newPosts = [...response.data];
          setPosts([...copyPosts, ...newPosts]);
          
        } else {
          setNoMore(true); // 더 이상 데이터가 없음을 알림
          setAlertMessage('더 이상 데이터가 없습니다.');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        }
        
      })
      .catch(error => { 
        if (error.response) { // 요청은 성공했으나 응답은 실패
          setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('CategoryPosts error.response', error.response);
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
          console.log('CategoryPosts Unexpected error', error.message);
    }});
  })

  /**
   * 추가 데이터 로딩 함수
   * @returns 추가 데이터
   */
  const loadMoreData = () => {
    if (isLoading || noMore || posts.length < 10) return; // 이미 로딩 중이면 중복 요청 방지
    setIsLoading(true);

    setTimeout(() => { // 추가 데이터 로딩
      setPage(page + 1); // 페이지 번호 증가
      fetchpost(page); // 추가 데이터 로딩
      setIsLoading(false);
    }, 1000);
  }

  /**
   * 게시물 카테고리 한글로 변환
   */
  const convertCategoryKorean = (category) => {
    if (category === 'ELECTRONICS') {
      return '디지털/가전';
    } else if (category === 'FURNITURE') {
      return '가구/인테리어';
    } else if (category === 'CLOTHING') {
      return '의류';
    } else if (category === 'BOOKS_TICKETS_RECORDS_GAMES') {
      return '도서/티켓/음반/게임';
    } else if (category === 'BEAUTY') {
      return '뷰티/미용';
    } else if (category === 'ETC') {
      return '기타';
    }
  };


  if (isLoading) {
    return <Loading />
  }
  else if (posts.length > 0) { // 관심목록 게시글이 있을 경우
    return (
      <>
        <View style={shared.container}>
          <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>{convertCategoryKorean(category)}</Text>
          <View style={shared.iconButton}></View>
          </View>

          <View style={styles.content}>
          <FlatList
            data={posts}
            renderItem={({item, index}) => <RenderPosts item={item} index={index} navigation={navigation} />}
            keyExtractor={item => item.id}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.3}
            ListFooterComponent={isLoading && <Loading />}
            style={styles.content}
          />
          </View>
        </View>
        {showAlert && <Alert message={alertMessage} />}
      </>
    )
  }
  else { // 관심목록 게시글이 없을 경우
    return (
      <>
      <View style={shared.container}>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>{convertCategoryKorean(category)}</Text>
          <View style={shared.iconButton}></View>
        </View>
      
        <View style={styles.noPostsContainer}>
          <Text style={shared.text}>{`앗! ${convertCategoryKorean(category)}에 맞는 결과가 없어요.`}</Text>
          <Text style={styles.noPostsText}>다른 카테고리에서 찾아보세요.</Text>
        </View>
      </View>
      </>
    )
  }
};

export default CategoryPosts;