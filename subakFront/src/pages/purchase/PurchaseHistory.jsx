import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/purchaseHistory/purchaseHistory';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import RenderHistoryPosts from '../itemHistory/RenderHistoryPosts';
import ChoiceDiaglog from '../components/ChoiceDiaglog';

const PurchaseHistory = ({navigation}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터

  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [openModal, setOpenModal] = useState(false); // 모달창 여부
  const [modalIndex, setModalIndex] = useState(-1); // 모달창 인덱스
  const [modalPostId, setModalPostId] = useState(-1); // 모달창 게시글 아이디

  const [noMore, setNoMore] = useState(false); // 더 이상 데이터가 없는지 확인
  const [page, setPage] = useState(1); // 페이지 번호

  const [posts, setPosts] = useState([]); // 게시글 목록

  useEffect(() => {
    fetchpost(1);
    setIsLoading(false);
  }, []);

  // 화면이 포커스 되었을 때 실행되는 함수
  useFocusEffect(
    useCallback(() => {
      fetchpost(page);
    }, [])
  );

  /**
   * 구메 목록을 불러오는 함수
   */
  const fetchpost = useCallback((page) => {
    // TODO: 구매내역 목록을 불러오는 API 연결
    axios.get(`http://${Config.DB_IP}/posts/`,
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
        console.log('PurchaseHistory error.response', error.response);
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
        console.log('PurchaseHistory Unexpected error', error.message);
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
  * 옵션 모달 선택 버튼에 따라 실행
  */ 
  useEffect(() => {
    if (modalIndex === 0) { // 목록에서 지우기
      // TODO: 목록에서 지우기 API 연결'
    }
    setModalIndex(-1); // 모달 선택 인덱스 초기화
    setModalPostId(-1); // 모달 선택 게시글 아이디 초기화
    setOpenModal(false); // 모달 창 닫기
  }, [modalIndex]);


  if (isLoading) {
    return <Loading />
  }
  else if (posts.length > 0) { // 구매내역 게시글이 있을 경우
    return (
      <>
        <View style={shared.container}>
          <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>나의 구매내역</Text>
          <View style={shared.iconButton}></View>
          </View>

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
                    onPress={() => {
                      // TODO: 받은 후기 보기
                      console.log('받은 후기 보기')
                    }}>
                    <Text style={shared.text}>받은 후기 보기</Text>
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
        </View>
        {openModal && (
          <ChoiceDiaglog
            openModal={openModal}
            setOpenModal={setOpenModal}
            setModalIndex={setModalIndex}
            choices={['목록에서 지우기']}
          />
        )}
        {showAlert && <Alert message={alertMessage} />}
      </>
    )
  }
  else { // 구매내역 게시글이 없을 경우
    return (
      <View style={shared.container}>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>나의 구매내역</Text>
          <View style={shared.iconButton}></View>
        </View>
      
        <View style={styles.noPostsContainer}>
          <Text style={styles.noPostsText}>아직 구매한 적이 없어요.</Text>
          <Text style={styles.noPostsText}>우리 동네에 올라온 글을 탐색하고 물건을 찾아보세요!</Text>
        </View>
      </View>
    )
  }
};

export default PurchaseHistory;