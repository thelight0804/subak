import { useState, useEffect, useCallback, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';
import Swiper from 'react-native-swiper'

import Alert from '../components/Alert';
import Loading from '../components/Loading';
import CommaPrice from '../components/CommaPrice';
import ChoiceDiaglog from '../components/ChoiceDiaglog';
import UpdateCommentModal from './UpdateCommentModal';

import { colorPalette, shared } from '../../styles/shared';
import styles from '../../styles/post/postDetail';

const PostDetail = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const scrollRef = useRef(); // 스크롤 뷰 ref
  const prevProfileImg = '../../assets/image/user-profile.png'; // 기존 프로필 이미지
  
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [commentPosition, setCommentPosition] = useState(0); // 댓글 y축 위치
  
  const [postStatus, setPostStatus] = useState(''); // 게시물 상태
  const [liked, setLiked] = useState(false); // 좋아요 여부
  const [category, setCategory] = useState(''); // 게시물 카테고리
  
  const [openOptionModal, setOpenOptionModal] = useState(false); // 옵션 모달 창
  const [modalIndex, setModalIndex] = useState(-1); // 옵션 모달 선택 인덱스
  const [openStateModal, setOpenStateModal] = useState(false); // 게시물 상태 모달 창
  const [modalStateIndex, setModalStateIndex] = useState(-1); // 게시물 상태 모달 선택 인덱스
  const [openUpdateCommentModal, setUpdateCommentModal] = useState(false); // 입력 텍스트 모달 창

  const [openSellerCommentModal, setSellerOpenCommentModal] = useState(false); // 판매자 댓글 상태 모달 창
  const [modalSellerCommentIndex, setModalSellerCommentIndex] = useState(-1); // 판매자 댓글 상태 모달 선택 인덱스
  const [openBuyerCommentModal, setBuyerOpenCommentModal] = useState(false); // 구매자 댓글 상태 모달 창
  const [modalBuyerCommentIndex, setModalBuyerCommentIndex] = useState(-1); // 구매자 댓글 상태 모달 선택 인덱스\

  const [post, setPost] = useState(null); // 게시물 상세 데이터
  const [comments, setComments] = useState([]); // 댓글
  const [selectedCommentID, setSelectedCommentID] = useState(-1); // 선택된 댓글 ID
  const [inputComment, setInputComment] = useState(''); // 입력된 댓글

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
   * 판매자 댓글 선택 버튼에 따라 실행
   */
  useEffect(() => {
    if (modalSellerCommentIndex === 0) {
      sellPost();
    }
    else if (modalSellerCommentIndex === 1) {
      deleteComment();
    }
    setModalSellerCommentIndex(-1);
    setSellerOpenCommentModal(false);
  }, [modalSellerCommentIndex]);

  /**
   * 구매자 댓글 선택 버튼에 따라 실행
   */
  useEffect(() => {
    if (modalBuyerCommentIndex === 0) {
      setUpdateCommentModal(true); // 수정하기 모달 창 열기
    }
    else if (modalBuyerCommentIndex === 1) {
      deleteComment();
    }
    setModalBuyerCommentIndex(-1);
    setBuyerOpenCommentModal(false);
  }, [modalBuyerCommentIndex]);

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
          setLiked(response.data.hearted);
          setComments(response.data.comments);
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
        setAlertMessage(`게시글을 숨겼어요.`);
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
   * 판매 완료 처리
   */
  const sellPost = () => {
    axios.post(`http://${Config.DB_IP}/posts/${post.id}/sell`,
      { buyerId: post.comments[selectedCommentID].commentMemberId },
      {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        },
        timeout: 2000
      })
    .then(response => {
      setAlertMessage('판매가 완료되었습니다.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      patchStatus('거래완료');
      fetchPost();
    })
    .catch(error => {
      if (error.response) {
        setAlertMessage(`${error.response.data}`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.error('sellPost error.response : ', error.response.data);
      } else if (error.request) {
        setAlertMessage('서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      } else {
        setAlertMessage(`오류가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.error('sellPost Unexpected error : ', error.message);
      }
    });
  }
  
  /**
   * 댓글 작성 함수
   */
  const addComment = () => {
    axios.post(`http://${Config.DB_IP}/post/${post.id}/comments`,
      { content: inputComment },
      {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        },
        timeout: 2000
      })
    .then(response => {
      setAlertMessage('댓글을 작성했습니다.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      fetchPost();
      setInputComment('');
    })
    .catch(error => {
      if (error.response) {
        setAlertMessage(`${error.response.data}`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.error('addComment error.response : ', error.response.data);
      } else if (error.request) {
        setAlertMessage('서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      } else {
        setAlertMessage(`오류가 발생했습니다. \n[${error.message}]`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.error('addComment Unexpected error : ', error.message);
      }
    });
  }

  /**
   * 댓글 삭제 함수
   */
  const deleteComment = () => {
    const commentID = post.comments[selectedCommentID].id; // 선택된 댓글 ID
    
    axios.delete(`http://${Config.DB_IP}/post/${route.params.postId}/comments/${commentID}`,
      {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        },
        timeout: 2000
      }
    )
    .then(response => {
      setAlertMessage(`댓글이 삭제되었습니다.`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      fetchPost(); // 댓글 삭제 후 데이터 다시 가져오기
    })
    .catch(error => {
      if (error.response) {
        setAlertMessage(
          `데이터를 불러오는데 에러가 발생했습니다. \n[${error.response.data}]`,
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('deleteComment error.response : ', error.response.data);
      } else if (error.request) {
        setAlertMessage(
          '서버와의 연결이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.',
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      } else {
        setAlertMessage(
          `데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`,
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('deleteComment Unexpected error : ', error.message);
      }
    });
  }

  /**
   * 댓글 설정 모달
   * @param {Number} index 댓글 인덱스
   */
  const handleCommentModal = (index) => {
    setSelectedCommentID(index); // 선택된 댓글 ID
    if (userData.id === post.memberId && userData.id !== post.comments[index].commentMemberId) { // 판매자 댓글 모달
      setSellerOpenCommentModal(true);
    } else { // 구매자 댓글 모달
      setBuyerOpenCommentModal(true);
    }
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
    /**
     * 댓글 컴포넌트 y축 위치 저장 함수
     */
    const onLayout = (event) => {
      setCommentPosition(event.nativeEvent.layout.y);
    }

    return (
      <>
        {[post.postImages.length > 0 ? (
            <Swiper 
              style={styles.imageContainer}
              activeDotColor={colorPalette.main}
            >
              {post.postImages.map((image, index) => {
                return (
                  <View key={index}>
                    <Image
                      style={styles.mainImage}
                      source={{uri: image}}
                    />
                  </View>
                );
              })}
            </Swiper>
          ) : (
            <View style={styles.notImageContainger} key={'postImage'} />
          ),
        ]}

        <View style={styles.titleContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={
                post.profileImage
                  ? {uri: post.profileImage}
                  : require(prevProfileImg)
              }
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

        <View style={styles.commentContainer} onLayout={onLayout}>
          {comments.map((comment, index) => {
            return (
              <View style={styles.comment} key={index}>
                <View
                  style={[
                    styles.profileContainer,
                    {justifyContent: 'space-between'},
                  ]}>
                  <View style={shared.inlineContainer}>
                    <Image
                      style={styles.commentProfileImage}
                      source={
                        comment.profileImage
                          ? {uri: comment.profileImage}
                          : require(prevProfileImg)
                      }
                    />
                    <View style={styles.profileNameContainer}>
                      <Text style={styles.text}>
                        {comment.memberName}{' '}
                        <Text style={{color: colorPalette.gray}}>
                          {comment.commentMemberId}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={shared.inlineContainer}>
                    <View>
                      <Text style={[styles.textGray, {textAlign: 'right'}]}>
                        {comment.cmDateTime}
                      </Text>
                    </View>
                    {userData.id === comment.commentMemberId || userData.id === post.memberId ? (
                      <TouchableOpacity
                        style={[shared.grayButton, styles.commentMenuButton]}
                        onPress={() => handleCommentModal(index)}>
                        <Icon
                          name="ellipsis-horizontal"
                          size={12}
                          color="white"
                        />
                      </TouchableOpacity>
                      ) : null}
                  </View>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            );
          })}
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
    const handleComment = () => {
      if (inputComment === '') { // 댓글 내용이 없을 경우
        setAlertMessage('댓글 내용을 입력해주세요.');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        return;
      }
      else { // 댓글 내용이 있을 경우
        addComment();
      }
    }

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

        <TouchableOpacity style={shared.button} onPress={handleComment}>
          <Text style={[styles.buttonText, shared.redButton]}>댓글달기</Text>
        </TouchableOpacity>
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

      <ScrollView style={styles.content} ref={scrollRef}>
        {post ? <RenderContent/> : <Loading />}
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setInputComment(text)}
          value={inputComment}
          inputMode="text"
          placeholder="댓글을 입력해 주세요."
          placeholderTextColor="#676c74" />
        <TouchableOpacity 
          style={styles.closeIcon}
          onPress={() => setInputComment('')}>
          <Icon name="close" size={10} color="#212123" />
        </TouchableOpacity>
      </View>

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
      {openSellerCommentModal && (
        <ChoiceDiaglog
          openModal={openSellerCommentModal}
          setOpenModal={setSellerOpenCommentModal}
          setModalIndex={setModalSellerCommentIndex}
          choices={['판매하기', '삭제']}
        />
      )}
      {openBuyerCommentModal && (
        <ChoiceDiaglog
          openModal={openBuyerCommentModal}
          setOpenModal={setBuyerOpenCommentModal}
          setModalIndex={setModalBuyerCommentIndex}
          choices={['수정하기', '삭제']}
        />
      )}
      {openUpdateCommentModal && (
        <UpdateCommentModal
          comment={comments[selectedCommentID]}
          openModal={openUpdateCommentModal}
          setOpenModal={setUpdateCommentModal}
          postId={post.id}
          token={userData.token}
        />
      )}
    {showAlert && <Alert message={alertMessage} />}
  </View>
  );
};


export default PostDetail;