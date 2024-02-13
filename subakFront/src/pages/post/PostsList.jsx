import {useState, useEffect, useCallback} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/postsList';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import RenderPosts from '../components/RenderPosts';

const PostsList = ({navigation, route}) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지 번호
  const [noMore, setNoMore] = useState(false); // 더 이상 데이터가 없는지 확인

  // const [posts, setPosts] = useState([
  //   {
  //     "id": 0,
  //     "memberName": "0",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702469326/9cbfa241-b35f-45e6-9c69-64f8102d953a.jpg.jpg",
  //     "postTitle": "0",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702468776/ab63209a-9fdf-44d0-bafa-ccecd61c1f9f.png.jpg",
  //     "price": 0,
  //     "postDateTime": "3일 전",
  //     "address": "00",
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  // ]);

  const [posts, setPosts] = useState([]); // 포스트 목록

  useEffect(() => {
    getAllPost(0);
  }, []);

  // 포커스를 얻었을 때 데이터 다시 가져오기
  useFocusEffect(
    useCallback(() => {
      getAllPost(0);

      return () => {
        setPosts([]);
        setPage(1);
        setNoMore(false);
      };
    }, [])
  );
  
  /**
   * 추가 데이터 로딩 함수
   * @returns 추가 데이터
   */
  const loadMoreData = () => {
    if (isLoading || noMore || posts.length < 10) return; // 이미 로딩 중이면 중복 요청 방지
    setIsLoading(true);

    setTimeout(() => { // 추가 데이터 로딩
      setPage(page + 1); // 페이지 번호 증가
       getAllPost(page);  // 추가 데이터 로딩
      setIsLoading(false);
    }, 1000);
  }

  /**
   * 전체 게시물 목록 가져오는 함수
   */
  const getAllPost = useCallback((start) => {
    axios.get(`http://${Config.DB_IP}/posts?offset=${start*10}&limit=10`, {timeout: 2000})
      .then(response => {
          if (response.status === 200) {
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
        }
      })
      .catch(error => { 
        if (error.response) { // 요청은 성공했으나 응답은 실패
          setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostsList error.response', error.response);
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
          console.log('PostsList Unexpected error', error.message);
    }});
  });

  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>
          <View style={styles.inlineContainer}>
            <TouchableOpacity
              style={shared.iconButton}
              onPress={() => navigation.navigate('PostStack', {screen: 'Search'})}>
              <Icon name="search" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.menuButtonContainer}
            onPress={() => navigation.navigate('PostStack', {screen: 'CategorySelection'})}>
              <Icon name="menu" size={20} color="#FFFFFF"/>
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          renderItem={({item, index}) => <RenderPosts item={item} index={index} navigation={navigation} />}
          keyExtractor={item => item.id}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isLoading && <Loading />} // 추가 데이터 로딩 중일 때 표시될 컴포넌트
          style={styles.content}
        />

        <View style={styles.newPost}>
          <TouchableOpacity
            style={styles.newPostButton}
            onPress={() => navigation.navigate('PostStack', {screen: 'NewPost'})}>
            <Icon name="add" size={30} color="#FFFFFF" />
            <Text style={styles.title}>글쓰기</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showAlert && <Alert message={alertMessage} />}
    </>
  )
};



export default PostsList;