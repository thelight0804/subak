import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/postDetail';

import Alert from '../components/Alert';
import Loading from '../components/Loading';
import CommaPrice from '../components/CommaPrice'
import ChoiceDiaglog from '../components/ChoiceDiaglog';

const PostDetail = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const prevProfileImg = '../../assets/image/user-profile.png'; // 기존 프로필 이미지
  const [post, setPost] = useState(null); // 게시물 상세 데이터

  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  const [postStatus, setPostStatus] = useState(''); // 게시물 상태
  const [liked, setLiked] = useState(false); // 좋아요 여부
  const [category, setCategory] = useState(''); // 게시물 카테고리

  const [openOptionModal, setOpenOptionModal] = useState(false); // 옵션 모달 창
  const [modalIndex, setModalIndex] = useState(-1); // 옵션 모달 선택 인덱스
  const [openStateModal, setOpenStateModal] = useState(false); // 옵션 모달 창
  const [modalStateIndex, setModalStateIndex] = useState(-1); // 옵션 모달 선택 인덱스

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

  const [tempColor, setTempColor] = useState('white'); // 매너 온도 색상
  const [tempEmoji, setTempEmoji] = useState('❔'); // 매너 온도 이모지

  // 게시물 상세 데이터 가져오기
  useEffect(() => {
    fetchPost();
    setIsLoading(false);
  }, []);

  // 포커스를 얻었을 때 데이터 다시 가져오기
  useFocusEffect(
    useCallback(() => {
      fetchPost();
      setIsLoading(false);
    }, []),
  );

  /**
   * 매너온도에 따른 색상, 이모지 변경
   */
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

  useEffect(() => {
    if (post) {
      convertPostStatusKorean(post.productStatus)
      convertCategoryKorean(post.category)
    }
  }, [post]);

  /**
   * 옵션 모달 선택 버튼에 따라 실행
   */ 
  useEffect(() => {
    if (modalIndex === 0) { // 게시글 수정
      navigation.navigate('PostStack', {screen: 'PostEdit', params: {postId: post.id}})
    }
    else if (modalIndex === 1) { // 끌어올리기
      navigation.navigate('PostStack', {screen: 'PostRecent', params: {postId: post.id, postTitle: post.postTitle, postImage: post.postImages[0], postPrice: post.price}})
    }
    else if (modalIndex === 2) { // 숨기기
      hidePost();
    }
    else if (modalIndex === 3) { // 삭제
      deletePost();
    }
    setModalIndex(-1); // 모달 선택 인덱스 초기화
    setOpenOptionModal(false); // 모달 창 닫기
  }, [modalIndex]);

  /**
   * 게시물 상태 모달 선택 버튼에 따라 실행
   */
  useEffect(() => {
    if (modalStateIndex === 0) {
      patchStatus("판매중");
    }
    else if (modalStateIndex === 1) {
      patchStatus("예약중");
    }
    else if (modalStateIndex === 2) {
      patchStatus("거래완료");
    }
    setModalStateIndex(-1); // 모달 선택 인덱스 초기화
    setOpenStateModal(false); // 모달 창 닫기
  }, [modalStateIndex]);

  /**
   * 게시물 상세 데이터 가져오기 함수
   */
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
          setLiked(response.data.liked);
        }
      })
      .catch(error => { 
        if (error.response) { // 요청은 성공했으나 응답은 실패
          setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostsDetail error.response', error.response);
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
          console.log('PostDetail Unexpected error', error.message);
        }});
  })

  /**
   * 게시물 상태 한글로 변환
   */
  const convertPostStatusKorean = (productStatus) => {
    if (productStatus === 'SALE') {
      setPostStatus('판매중');
    } else if (productStatus === 'RESERVATION') {
      setPostStatus('예약중');
    } else if (productStatus === 'COMPLETE') {
      setPostStatus('거래완료');
    }
  };

  /**
   * 게시물 카테고리 한글로 변환
   */
  const convertCategoryKorean = (category) => {
    if (category === 'ELECTRONICS') {
      setCategory('디지털/가전');
    } else if (category === 'FURNITURE') {
      setCategory('가구/인테리어');
    } else if (category === 'CLOTHING') {
      setCategory('의류');
    } else if (category === 'BOOKS_TICKETS_RECORDS_GAMES') {
      setCategory('도서/티켓/음반/게임');
    } else if (category === 'BEAUTY') {
      setCategory('뷰티/미용');
    } else if (category === 'ETC') {
      setCategory('기타');
    }
  };

  /**
   * 게시물 삭제 함수
   */
  const deletePost = () => {
    console.log(post.id);
    console.log(userData.token);
    axios.delete(`http://${Config.DB_IP}/post/${post.id}`,
        {
          headers: { 'Authorization': `Bearer ${userData.token}`}, // 로그인 토큰
          timeout: 2000, // 2초 타임아웃
        },
      )
      .then(response => {
        if (response.status === 200) {
          setAlertMessage(`게시글이 삭제되었습니다.`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          navigation.navigate('PostsList', {params: {deleteAlert: true}}); // 게시글 목록으로 이동
        }
      })
      .catch(error => {
        if (error.response) {
          // 요청은 성공했으나 응답은 실패
          setAlertMessage(
            `데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`,
          );
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostsDetail error.response', error.response.data);
        } else if (error.request) {
          // timeout으로 요청 실패
          setAlertMessage(
            '서버와의 연결이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.',
          );
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        } else {
          // 기타 오류 발생
          setAlertMessage(
            `데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`,
          );
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostDetail Unexpected error', error.message);
        }
      });
  }

  /**
   * 게시물 숨기기 함수
   */
  const hidePost = () => {
    axios.patch(`http://${Config.DB_IP}/post/${post.id}/status`,
      {
          postStatus: 'HIDE',
      },
      {
        headers: {
          'Authorization': `Bearer ${userData.token}` // 토큰 값을 추가
        },
        timeout: 2000 // 타임아웃을 2초로 설정
      }
    )
    .then(response => {
      if (response.status === 200) {
        setAlertMessage(`게시글이 .`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      }
      navigation.navigate('PostsList'); // 게시글 목록으로 이동
    })
    .catch(error => { 
      if (error.response) { // 요청은 성공했으나 응답은 실패
        setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('PostsDetail error.response', error.response);
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
        console.log('PostDetail Unexpected error', error.message);
      }}
    )
  }

  /**
   * 게시글 좋아요 함수
   */
  const handleLike = () => {
    // 좋아요 API 호출
    axios.post(`http://${Config.DB_IP}/post/${post.id}/hearts`,
      {},
      {
      headers: {
        Authorization: `Bearer ${userData.token}`
      },
      timeout: 2000 // 타임아웃을 2초로 설정
      })
      .then(response => {
        if (response.status === 200) {
          liked ? setLiked(false) : setLiked(true);
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
  }

  /**
   * 게시물 상태 변경 함수
   */
  const patchStatus = (status) => {
    var updateStatus = status; // 백엔드용 영어값 변수

    switch(status) { // 한글값을 영어값으로 변경
      case '판매중':
        updateStatus = 'SALE';
        break;
      case '예약중':
        updateStatus = 'RESERVATION';
        break;
      case '거래완료':
        updateStatus = 'COMPLETE';
        break;
    }

    axios.patch(`http://${Config.DB_IP}/post/${post.id}/product-status`,
      {
          productStatus: updateStatus,
      },
      {
        headers: {
          'Authorization': `Bearer ${userData.token}` // 토큰 값을 추가
        },
        timeout: 2000 // 타임아웃을 2초로 설정
      }
    )
    .then(response => {
      if (response.status === 200) {
        setPostStatus(status); // 게시물 상태 state 변경
      }
    })
    .catch(error => { 
      if (error.response) { // 요청은 성공했으나 응답은 실패
        setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('patchStatus error.response', error.response);
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
        console.log('patchStatus Unexpected error', error.message);
      }}
    )
  }

  /**
   * 옵션 버튼 렌더링 함수
   */
  const RenderOption = () => {
    return (
      <TouchableOpacity
        style={shared.iconButton}
        onPress={() => setOpenOptionModal(true)}>
        <Icon name="ellipsis-vertical-sharp" size={25} color="#FFFFFF" />
      </TouchableOpacity>
    );
  }

  /**
   * 게시물 상세 데이터 렌더링 함수
   */
  const RenderContent = () => {
    return (
      <>
        {[post.postImages.length > 0 ? (
            <View style={styles.imageContainer} key={post.postImages}>
              <Image style={styles.mainImage} source={{uri: post.postImages[0]}} />
            </View>
          ) : (
            <View style={styles.notImageContainger} key={"postImage"} />
          ),
        ]}
  
        <View style={styles.titleContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={post.profileImage ? {uri: post.profileImage} : require(prevProfileImg)}
            />
            <View style={styles.profileNameContainer}>
              <Text style={styles.text}>{post.memberName}</Text>
              <Text style={styles.textGray}>{post.address}</Text>
            </View>
          </View>
          <View style={styles.tempContainger}>
            <View style={styles.tempContainer}>
              <View>
                <Text style={[styles.temp, {color: tempColor}]}>
                  {' '}
                  {`${post.temp}℃`}
                </Text>
                <View>
                  <View style={styles.tempBar} />
                  <View
                    style={[
                      styles.tempBar,
                      styles.tempColorBar,
                      {backgroundColor: tempColor},
                      {width: (post.temp * 40) / 100},
                    ]}
                  />
                </View>
              </View>
              <Text style={styles.tempEmoji}>{tempEmoji}</Text>
            </View>
            <Text style={styles.tempText}>매너온도</Text>
          </View>
        </View>

        {userData.id === post.memberId && <RenderPostState />}

        <View style={styles.postContent}>
          <Text style={[styles.text, styles.postTitle]}>{post.postTitle}</Text>
          <Text style={[styles.textGray, styles.postDateTime]}>
            {`${category} ㆍ ${post.postDateTime}`}
          </Text>
          <Text style={[styles.text, styles.content]}>{post.content}</Text>
        </View>
      </>
    );
  }

  /**
   * 게시물 상태 dropdown 렌더링 함수
   */
  const RenderPostState = () => {
    return (
      <TouchableOpacity 
        style={styles.statusContainer}
        onPress={() => setOpenStateModal(true)}
      >
      <Text style={shared.text}>{postStatus}</Text>
      <Icon name="chevron-down-sharp" size={15} color="#868b94" />
    </TouchableOpacity>
    )
  }

  /**
   * 게시물 하단 렌더링 함수
   */
  const RenderFooter = () => {
    return (
      <>
        <View style={styles.heartContainer}>
          <TouchableOpacity style={styles.heart} onPress={handleLike}>
            {liked ? (
              <Icon name="heart-sharp" color="#dc645b" size={25} />
            ) : (
              <Icon name="heart-outline" color="#868b94" size={25} />
            )}
          </TouchableOpacity>
          <Text style={styles.price}>
            {post.price === 0 ? (
              <Text>
                나눔 <Icon name="heart" size={15} color="#dc645b" />
              </Text>
            ) : (
              `${CommaPrice(post.price)}원`
            )}
          </Text>
        </View>

        {post && userData.id !== post.memberId && (
          <TouchableOpacity style={shared.button}>
            <Text style={[styles.buttonText, shared.redButton]}>구매하기</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  if (isLoading) {
    return <Loading />
  }
  
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
        {post && userData.id === post.memberId && <RenderOption />}
      </View>

      <ScrollView style={styles.content}>
        {post ? <RenderContent/> : <Loading />}
      </ScrollView>

      <View style={styles.footer}>
        {post && <RenderFooter /> }
      </View>
      {openOptionModal && (
        <ChoiceDiaglog
          openModal={openOptionModal}
          setOpenModal={setOpenOptionModal}
          setModalIndex={setModalIndex}
          choices={['게시글 수정', '끌어올리기', '숨기기', '삭제']}
        />
      )}
      {openStateModal && (
        <ChoiceDiaglog
          openModal={openStateModal}
          setOpenModal={setOpenStateModal}
          setModalIndex={setModalStateIndex}
          choices={['판매중', '예약중', '거래완료']}
        />
      )}
    {showAlert && <Alert message={alertMessage} />}
  </View>
  );
};


export default PostDetail;