import {useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/postsList';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import CommaPrice from '../components/CommaPrice';
import setStorageData from '../../data/asyncStorage/setStorageData';
import getStorageData from '../../data/asyncStorage/getStorageData';
import { set } from 'react-native-reanimated';

const PostsList = ({navigation}) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지 번호
  const [noMore, setNoMore] = useState(false); // 더 이상 데이터가 없는지 확인

  const noPostImage = '../../assets/image/noPostImage.png';

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
  //   {
  //     "id": 1,
  //     "memberName": "1",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "1",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 1,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 2,
  //     "memberName": "2",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "2",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 2,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 3,
  //     "memberName": "3",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "3",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 3,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 4,
  //     "memberName": "4",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "4",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 4,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 5,
  //     "memberName": "5",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "5",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 5,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 6,
  //     "memberName": "6",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "6",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 6,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 7,
  //     "memberName": "7",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "7",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 7,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 8,
  //     "memberName": "8",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "8",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 8,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  //   {
  //     "id": 9,
  //     "memberName": "9",
  //     "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
  //     "postTitle": "9",
  //     "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
  //     "price": 9,
  //     "postDateTime": "3일 전",
  //     "address": null,
  //     "heartCount": 0,
  //     "commentCount": 0
  //   },
  // ]);

  const [posts, setPosts] = useState([]); // 포스트 목록

  // 초기 데이터 로딩
  useEffect(() => {
    getLoadPost(0);
  }, []);

  
  const loadMoreData = () => {
    if (isLoading || noMore) return; // 이미 로딩 중이면 중복 요청 방지
    setIsLoading(true);

    setTimeout(() => { // 추가 데이터 로딩
      setPage(page + 1); // 페이지 번호 증가
      getLoadPost(page); // 추가 데이터 로딩
      setIsLoading(false);
    }, 1000);
  }

  const getLoadPost = (start) => {
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
  }

  const RenderPost = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() =>
          navigation.navigate('PostStack', {
            screen: 'PostDetail',
            params: {postId: item.id},
          })
        }>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={item.firstImage ? {uri: item.firstImage} : require(noPostImage)}
          />
        </View>
        <View style={styles.postContentContainer}>
          <Text style={styles.title}>{item.postTitle}</Text>
          <Text style={[styles.grayText, styles.address]}>{`${item.address}ㆍ${item.postDateTime}`}</Text>
          <Text style={styles.price}>{`${CommaPrice(item.price)}원`}</Text>
          <View style={styles.heartCountContainer}>
            <Text style={[styles.grayText, styles.heartCount]}>{item.heartCount}</Text>
            <Icon name="heart-outline" size={18} color="#868b94"></Icon>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>
          <View style={styles.inlineContainer}>
            <TouchableOpacity
              style={shared.iconButton}
              onPress={() => console.log("search icon 클릭!")}>
              <Icon name="search" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={posts}
          renderItem={RenderPost}
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