import { useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from 'axios';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from "../../styles/shared";
import styles from "../../styles/itemHistory/tabsScreen"

import Loading from '../components/Loading';
import RenderHistoryPosts from "./RenderHistoryPosts";
import Alert from '../components/Alert';
import ChoiceDiaglog from "../components/ChoiceDiaglog";

const HiddenScreen = () => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [openModal, setOpenModal] = useState(false); // 모달창 여부
  const [modalIndex, setModalIndex] = useState(-1); // 모달창 인덱스
  const [modalPostId, setModalPostId] = useState(-1); // 모달창 게시글 아이디

  const [noMore, setNoMore] = useState(false); // 더 이상 데이터가 없는지 확인
  const [page, setPage] = useState(1); // 페이지 번호

  // const [posts, setPosts] = useState([]); // 게시글 목록
  const [posts, setPosts] = useState([
    {
      "id": 0,
      "memberName": "0",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702469326/9cbfa241-b35f-45e6-9c69-64f8102d953a.jpg.jpg",
      "postTitle": "0",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702468776/ab63209a-9fdf-44d0-bafa-ccecd61c1f9f.png.jpg",
      "price": 0,
      "postDateTime": "3일 전",
      "address": "00",
      "heartCount": 0,
      "commentCount": 0
    },
    {
      "id": 1,
      "memberName": "1",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
      "postTitle": "1",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
      "price": 1,
      "postDateTime": "3일 전",
      "address": null,
      "heartCount": 0,
      "commentCount": 0
    },
    {
      "id": 2,
      "memberName": "2",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
      "postTitle": "2",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
      "price": 2,
      "postDateTime": "3일 전",
      "address": null,
      "heartCount": 0,
      "commentCount": 0
    },
    {
      "id": 3,
      "memberName": "3",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
      "postTitle": "3",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
      "price": 3,
      "postDateTime": "3일 전",
      "address": null,
      "heartCount": 0,
      "commentCount": 0
    },
    {
      "id": 4,
      "memberName": "4",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
      "postTitle": "4",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
      "price": 4,
      "postDateTime": "3일 전",
      "address": null,
      "heartCount": 0,
      "commentCount": 0
    },
    {
      "id": 5,
      "memberName": "5",
      "profileImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702546076/96eafb54-faab-407e-ab30-4f907000af7c.png.jpg",
      "postTitle": "5",
      "firstImage": "http://res.cloudinary.com/dp3fl7ntb/image/upload/v1702806437/2716f2b3-7b39-4245-ba10-ba82c8bf307d.jpg.jpg",
      "price": 5,
      "postDateTime": "3일 전",
      "address": null,
      "heartCount": 0,
      "commentCount": 0
    }
  ]);

  useEffect(() => {
    // fetchpost(1);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // fetchpost(page);
    }, [])
  );

  /**
   * 거래완료 게시글 목록을 불러오는 함수
   */
  const fetchpost = useCallback((page) => {
    // TODO: 거래완료 API 연동
    axios.get(`http://${Config.DB_IP}/URL`,
      {headers: {
        'Authorization': `Bearer ${userData.token}` // 토큰 값
      },
      timeout: 2000 // 타임아웃
      }
    )
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
        console.log('CompletedScreen error.response', error.response);
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
        console.log('CompletedScreen Unexpected error', error.message);
      }
      setPosts([]);
    });
    setPosts([]);
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
   * 판매중으로 변경 함수
   * @param {Number} id 게시글 id
   */
  const changeSelling = (id) => {
    axios.patch(`http://${Config.DB_IP}/URL`,
      {
        postStatus: 'SALE',
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
        setAlertMessage(`게시물이 다시 이웃에게 보여요.`);
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
        console.log('CompletedScreen error.response', error.response);
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
        console.log('CompletedScreen Unexpected error', error.message);
      }}
    )
  
  }

  /**
  * 게시물 삭제 함수
  * @param {Number} id 게시글 id
  */
  const deletePost = (id) => {
    axios.delete(`http://${Config.DB_IP}/post/${id}`, {
        headers: {Authorization: `Bearer ${userData.token}`}, // 로그인 토큰
        timeout: 2000, // 2초 타임아웃
      })
      .then(response => {
        if (response.status === 200) {
          setAlertMessage(`게시글이 삭제되었습니다.`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        }
      })
      .catch(error => {
        if (error.response) {
          // 요청은 성공했으나 응답은 실패
          setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('CompletedScreen error.response', error.response.data);
        } else if (error.request) {
          // timeout으로 요청 실패
          setAlertMessage('서버와의 연결이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        } else {
          // 기타 오류 발생
          setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('CompletedScreen Unexpected error', error.message);
        }
      });
  };

  /**
  * 옵션 모달 선택 버튼에 따라 실행
  */ 
  useEffect(() => {
    if (modalIndex === 0) { // 판매중
      navigation.navigate('PostStack', {screen: 'PostEdit', params: {postId: setModalPostId}})
    }
    else if (modalIndex === 1) { // 삭제
      deletePost(modalPostId);
    }
    setModalIndex(-1); // 모달 선택 인덱스 초기화
    setModalPostId(-1); // 모달 선택 게시글 아이디 초기화
    setOpenModal(false); // 모달 창 닫기
  }, [modalIndex]);


  
  if (isLoading) {
    return <Loading />;
  }
  else if (posts.length === 0) {
    return (
      <View style={styles.noPostsContainer}>
        <Text style={styles.noPostsText}>판매중인 게시글이 없어요.</Text>
      </View>
    );
  }
  else {
    return (
      <View style={shared.container}>
        <View style={styles.content}>
          <FlatList
            data={posts}
            renderItem={({item, index}) => (
              <>
                <RenderHistoryPosts
                  item={item}
                  index={index}
                  navigation={navigation}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[shared.grayButton, styles.recentButton]}
                    onPress={() => changeSelling(item.id)}>
                    <Text style={shared.text}>숨기기 해제</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[shared.grayButton, styles.menuButton]}
                    onPress={() => {
                      setOpenModal(true)
                      setModalPostId(item.id)
                    }}>
                    <Icon name="ellipsis-horizontal" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </>
            )}
            keyExtractor={item => item.id}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.3}
            ListFooterComponent={isLoading && <Loading />}
            style={styles.content}
          />
        </View>
        {openModal && (
          <ChoiceDiaglog
            openModal={openModal}
            setOpenModal={setOpenModal}
            setModalIndex={setModalIndex}
            choices={['게시글 수정', '삭제']}
          />
        )}
        {showAlert && <Alert message={alertMessage} />}
      </View>
    );
  };
};

export default HiddenScreen;