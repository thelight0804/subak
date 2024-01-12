import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/postDetail';

import Loading from '../components/Loading';
import CommaPrice from '../components/CommaPrice'
import ChoiceDiaglog from '../components/ChoiceDiaglog';

const PostDetail = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터

  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [liked, setLiked] = useState(false); // 좋아요 여부

  const [openModal, setOpenModal] = useState(false); // 모달 창
  const [modalIndex, setModalIndex] = useState(-1); // 모달 선택 인덱스

  // FIX: 테스트용 코드
  // const [post, setPost] = useState({
  //   "id": 5004,
  //   "postImages": ["http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702469326/9cbfa241-b35f-45e6-9c69-64f8102d953a.jpg.jpg"],
  //   "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702469326/9cbfa241-b35f-45e6-9c69-64f8102d953a.jpg.jpg",
  //   "memberName": "IamYourFather",
  //   "address": "경남 창원시",
  //   "temp": 68.7,
  //   "price": 65000,
  //   "postTitle": "titleddd",
  //   "postDateTime": "3일 전",
  //   "content": "도\n레\n미\n파\n솔\n라\n시\n도\n레\n미\n파\n솔\n라\n시\n도\n레\n미\n파\n솔\n라\n시\n도"
  // })

  const [post, setPost] = useState(null); // 게시물 상세 데이터

  const [tempColor, setTempColor] = useState('white'); // 매너 온도 색상
  const [tempEmoji, setTempEmoji] = useState('❔'); // 매너 온도 이모지

  // 게시물 상세 데이터 가져오기
  useEffect(() => {
    fetchPost();
  }, []);

  // 포커스를 얻었을 때 데이터 다시 가져오기
  useFocusEffect(
    useCallback(() => {
      fetchPost();
    }, []),
  );

  // 매너온도에 따른 색상, 이모지 변경
  useEffect(() => {
    if (post) {
      if (post.temp <= 12.5) {
        setTempColor('#868b94');
        setTempEmoji('😠');
      } else if (post.temp <= 30) {
        setTempColor('#0277b2');
        setTempEmoji('🙁');
      } else if (post.temp <= 36.5){
        setTempColor('#019ceb');
        setTempEmoji('🙂');
      } else if (post.temp <= 50.5){
        setTempColor('#2fc795');
        setTempEmoji('😀');
      } else if (post.temp <= 65.5){
        setTempColor('#f7be68');
        setTempEmoji('😄');
      } else { // 최고 온도
        setTempColor('#ff6e1d');
        setTempEmoji('😆');
      }
    }
  }, [post]);

  // 모달 선택 버튼에 따라 실행
  useEffect(() => {
    if (modalIndex === 0) { // 게시글 수정
      navigation.navigate('PostStack', {screen: 'PostEdit', params: {postId: post.id}})
    }
    else if (modalIndex === 1) { // 끌어올리기
      navigation.navigate('PostStack', {screen: 'PostRecent', params: {postId: post.id, postTitle: post.postTitle, postImage: post.postImages[0], postPrice: post.price}})
    }
    else if (modalIndex === 2) { // 숨기기
      console.log('숨기기')
    }
    else if (modalIndex === 3) { // 삭제
      console.log('삭제')
    }
    setModalIndex(-1); // 모달 선택 인덱스 초기화
    setOpenModal(false); // 모달 창 닫기
  }, [modalIndex]);

  // 게시물 상세 데이터 가져오기 함수
  const fetchPost = useCallback(() => {
    axios.get(`http://${Config.DB_IP}/posts/${route.params.postId}`,
      {headers: {
        'Authorization': `Bearer ${userData.token}` // 토큰 값을 추가
      },
      timeout: 2000 // 타임아웃을 2초로 설정
      }
    )
      .then(response => {
        if (response.status === 200) {
          setPost(response.data);
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
  
  })
  
  return (
    <View style={shared.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.navigate('PostsList')}>
            <Icon name="home-outline" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={shared.iconButton}
          onPress={() => {
            setOpenModal(true);
          }}>
          <Icon name="ellipsis-vertical-sharp" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {post ? <RenderContent post={post} tempColor={tempColor} tempEmoji={tempEmoji}/> : <Loading />}
      </ScrollView>

      <View style={styles.footer}>
        {post && (
          <RenderFooter
            price={post.price}
            liked={liked}
            setLiked={setLiked}
            postId={post.id}
            userData={userData}
            setAlertMessage={setAlertMessage}
            setShowAlert={setShowAlert}
            />
          )
        }
      </View>
      {openModal && (
        <ChoiceDiaglog
          openModal={openModal}
          setOpenModal={setOpenModal}
          setModalIndex={setModalIndex}
          choices={['게시글 수정', '끌어올리기', '숨기기', '삭제']}
        />
      )}
  </View>
  );
};

const RenderContent = ({post, tempColor, tempEmoji}) => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image style={styles.mainImage} source={{uri: post.postImages[0]}} />
      </View>

      <View style={styles.titleContainer}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{uri: post.profileImage}} />
          <View style={styles.profileNameContainer}>
            <Text style={styles.text}>{post.memberName}</Text>
            <Text style={styles.textGray}>{post.address}</Text>
          </View>
        </View>
        <View style={styles.tempContainger}>
          <View style={styles.tempContainer}>
            <View>
              <Text style={[
                  styles.temp,
                  {color: tempColor},
                ]}> {`${post.temp}℃`}
              </Text>
              <View>
                <View style={styles.tempBar} />
                <View style={[
                    styles.tempBar,
                    styles.tempColorBar,
                    {backgroundColor: tempColor},
                    {width: (post.temp * 40) / 100}
                  ]} />
              </View>
            </View>
            <Text style={styles.tempEmoji}>{tempEmoji}</Text>
          </View>
          <Text style={styles.tempText}>매너온도</Text>
        </View>
      </View>

      <View style={styles.postContent}>
        <Text style={[styles.text, styles.postTitle]}>{post.postTitle}</Text>
        <Text style={[styles.textGray, styles.postDateTime]}>{post.postDateTime}</Text>
        <Text style={[styles.text, styles.content]}>{post.content}</Text>
      </View>
    </>
  );
}

const RenderFooter = ({price, liked, setLiked, postId, userData, setAlertMessage, setShowAlert}) => {
  return(
    <>
      <View style={styles.heartContainer}>
        <TouchableOpacity style={styles.heart}
          onPress={() => {
            // 좋아요 API 호출
            axios.post(`http://${Config.DB_IP}/post/${postId}/hearts`,
              {
              headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}` // TODO: 토큰 값 추가 오류
              },
              timeout: 2000 // 타임아웃을 2초로 설정
              })
              .then(response => {
                if (response.status === 200) {
                  setLiked(true);
                }
              })
              .catch(error => {
                if (error.response) {
                  // 요청은 성공했으나 응답은 실패
                  setLiked(false);

                  setAlertMessage(`${error.response.data}`);
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 6000);
                  console.error('PostDetail error.response', error.response.data);
                } else if (error.request) {
                  // timeout으로 요청 실패
                  setLiked(false);

                  setAlertMessage(
                    '서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.',
                  ); // 오류 메시지
                  setShowAlert(true); // 오류 알림창
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 6000); // 6초 후 알림창 사라짐
                } else {
                  // 기타 오류 발생
                  setLiked(false);

                  setAlertMessage(
                    `오류가 발생했습니다. \n[${error.message}]`,
                  );
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 6000);
                  console.error('PostDetail Unexpected error', error.message);
                }
              });
          }}
        >
          { liked ? 
            <Icon name="heart-sharp" color="#dc645b" size={25}/> :
            <Icon name="heart-outline" color="#868b94" size={25}/>
          }
        </TouchableOpacity>
        <Text style={styles.price}>{`${CommaPrice(price)}원`}</Text>
      </View>
      <TouchableOpacity style={shared.button}>
        <Text style={[styles.buttonText, shared.redButton]}>구매하기</Text>
      </TouchableOpacity>
  </>
  );
};

export default PostDetail;