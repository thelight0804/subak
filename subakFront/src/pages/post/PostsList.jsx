import {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Config from 'react-native-config';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/postsList';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import CommaPrice from '../components/CommaPrice';

const PostsList = ({navigation}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const dispatch = useDispatch(); // Redux dispatch
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [posts, setPosts] = useState([
    {
      "id": 5004,
      "memberName": "IamYourFather",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702469326/9cbfa241-b35f-45e6-9c69-64f8102d953a.jpg.jpg",
      "postTitle": "titleddd",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702468776/ab63209a-9fdf-44d0-bafa-ccecd61c1f9f.png.jpg",
      "price": 1,
      "postDateTime": "3일 전",
      "address": "00",
      "heartCount": 0,
      "commentCount": 0
    },
    {
      "id": 7001,
      "memberName": "zzzz",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
      "postTitle": "titleddd",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
      "price": 1,
      "postDateTime": "3일 전",
      "address": null,
      "heartCount": 0,
      "commentCount": 0
    },
  ]);

  // const [posts, setPosts] = useState(null); // 포스트 목록

  useEffect(() => {
    axios.get(`http://${Config.DB_IP}/posts`, {timeout: 2000})
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          setPosts(response.data);
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
  }, []);

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
        <ScrollView style={styles.content}>
          {posts ? <RenderPosts posts={posts} navigation={navigation}/> : <Loading />}
        </ScrollView>
      </View>
    </>
  )
};

const RenderPosts = ({posts, navigation}) => {
  return (
    <>
      {posts.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.postContainer}
          onPress={() =>
            navigation.navigate('PostStack', {
              screen: 'PostDetail',
              params: {postId: item.id},
            })
          }>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: item.firstImage}} />
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
      ))}
    </>
  );
};

export default PostsList;