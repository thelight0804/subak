import { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, TextInput, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { shared } from '../../styles/shared';
import styles from '../../styles/search/search';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import RenderPosts from '../components/RenderPosts';
import PriceInput from './PriceInput';
import CommaPrice from '../components/CommaPrice';

const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어
  const [posts, setPosts] = useState([]); // 포스트 목록

  const [isPrice, setIsPrice] = useState(false); // 가격 필터링
  const [openModal, setOpenModal] = useState(false); // 가격 모달 상태
  const [minPrice, setMinPrice] = useState(0); // 최소 금액
  const [maxPrice, setMaxPrice] = useState(0); // 최대 금액

  const [isNewest, setIsNewest] = useState(false); // 최신순 정렬
  const [isLiked, setIsLiked] = useState(false); // 좋아요 정렬
  const [isOnSale, setIsOnSale] = useState(false); // 판매중인 상품만 보기

  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지 번호
  const [noMore, setNoMore] = useState(false); // 더 이상 데이터가 없는지 확인

  // 포커스를 얻었을 때 데이터 다시 가져오기
  useFocusEffect(
    useCallback(() => {
      // getSearchData(0);

      return () => {
        setPosts([]);
        setPage(1);
        setNoMore(false);
      };
    }, [])
  );

  // 거래 가능 데이터 불러오기
  useEffect(() => {
    if (isOnSale) {
      setPosts([]);
      setPage(1);
      setNoMore(false);
      // 거래가능만 보기 API 불러오기
    }
  }, [isOnSale]);

  // 최신순 정렬 데이터 불러오기
  useEffect(() => {
    if (isNewest) {
      setPosts([]);
      setPage(1);
      setNoMore(false);
      // 최신순 정렬 API 불러오기
    }
  }, [isNewest]);

  // 좋아요순 정렬 데이터 불러오기
  useEffect(() => {
    if (isLiked) {
      setPosts([]);
      setPage(1);
      setNoMore(false);
      // 좋아요순 정렬 API 불러오기
    }
  }, [isLiked]);

  /**
   * 추가 데이터 로딩 함수
   * @returns 추가 데이터
   */
  const loadMoreData = () => {
    if (isLoading || noMore || posts.length < 10) return; // 이미 로딩 중이면 중복 요청 방지
    setIsLoading(true);

    setTimeout(() => { // 추가 데이터 로딩
      setPage(page + 1); // 페이지 번호 증가
      getSearchData(searchQuery, page);  // 추가 데이터 로딩
      setIsLoading(false);
    }, 1000);
  };

  /**
   * 가격 필터링 함수
   */
  const handleSetPrice = () => {
    setOpenModal(true);
  };

  /**
   * 최신순 정렬 함수
   */
  const setNewest = () => {
    setIsNewest(true);
    setIsLiked(false);
  };

  /**
   * 좋아요순 정렬 함수
   */
  const setLiked = () => {
    setIsLiked(true);
    setIsNewest(false);
  };

  // 검색 데이터 불러오는 함수
  const getSearchData = (query, start) => {
    axios.get(`http://61.78.179.229:8080/posts/search?keyword=${query}&limit=10&offset=${start}`, {timeout: 2000})
      .then(response => {
          if (response.status === 200) {
            if (response.data.length > 0) {
            const copyPosts = [...posts]
            const newPosts = [...response.data];
            setPosts([...copyPosts, ...newPosts]);
            // console.log(response.data);
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
          console.log('Search error.response', error.response);
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
          console.log('Search Unexpected error', error.message);
    }});
  };

  /**
   * 조건에 따라 가격 필터링 렌더링
   */
  const PriceRender = () => {
    if (isPrice) {
      if (minPrice === 0) {
        return <Text style={[styles.toggleText, isPrice && styles.selectedToggleText]}>{`${CommaPrice(maxPrice)}원 이하`}</Text>
      }
      else if (maxPrice === 0) {
        return <Text style={[styles.toggleText, isPrice && styles.selectedToggleText]}>{`${CommaPrice(minPrice)}원 이상`}</Text>
      }
      else {
        return <Text style={[styles.toggleText, isPrice && styles.selectedToggleText]}>{`${CommaPrice(minPrice)}원 ~ ${CommaPrice(maxPrice)}원`}</Text>
      }
    } 
    else {
      return <Text style={[styles.toggleText, isPrice && styles.selectedToggleText]}>가격</Text>
    }
  };

  return (
    <>
      <View style={shared.container}>
        {openModal && <PriceInput setIsPrice={setIsPrice} maxPrice={maxPrice} minPrice={minPrice} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} setOpenModal={setOpenModal}/>}
        <View style={[shared.inlineContainer, styles.header]}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setSearchQuery(text)}
              onSubmitEditing={() => {
                setIsLoading(true);
                setPosts([]); // 검색어가 바뀌면 포스트 목록 초기화
                getSearchData(searchQuery, 0)
                setIsLoading(false);
              }}
              value={searchQuery}
              inputMode="text"
              placeholder="검색어를 입력해 주세요."
              placeholderTextColor="#676c74" />
            <TouchableOpacity 
              style={styles.closeIcon}
              onPress={() => { setSearchQuery('') }}>
              <Icon name="close" size={10} color="#212123" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchResultContainer}>
          <View style={[shared.inlineContainer, styles.toggleContainer]}>
            <TouchableOpacity 
              style={[styles.toggle, isPrice && styles.selectedToggle]}
              onPress={() => handleSetPrice()}
            >
              <View style={[shared.inlineContainer]}>
                <PriceRender />
                <Icon name="chevron-down" size={15} color={isPrice ? "black" : "white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggle, isNewest && styles.selectedToggle]}
              onPress={() => {isNewest ? setIsNewest(false) : setNewest()}}
            >
              <View style={shared.inlineContainer}>
                <Text style={[styles.toggleText, isNewest && styles.selectedToggleText]}>최신순</Text>
                <Icon name="chevron-down" size={15} color={isNewest ? "black" : "white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggle, isLiked && styles.selectedToggle]}
              onPress={() => {isLiked ? setIsLiked(false) : setLiked()}}
            >
              <View style={shared.inlineContainer}>
                <Text style={[styles.toggleText, isLiked && styles.selectedToggleText]}>좋아요순</Text>
                <Icon name="chevron-down" size={15} color={isLiked ? "black" : "white"} />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={[shared.inlineContainer, styles.checkBoxContainer]}
              onPress={() => {isOnSale ? setIsOnSale(false) : setIsOnSale(true)}}
            >
              <View style={[styles.circleIcon, isOnSale && styles.filledCircleIcon]}>
                {isOnSale && <Icon name="checkmark" size={12} color={"white"} />}
              </View>
              <Text style={[shared.text, {fontWeight: 'normal'}]}>거래가능만 보기</Text>
            </TouchableOpacity>
          </View>
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
  )};

export default Search;
