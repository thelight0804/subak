import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, PermissionsAndroid, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/newPost';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const PostEdit = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const [post, setPost] = useState(null); // 게시물 상세 데이터

  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [isLoading, setIsLoading] = useState(true); // 로딩
  
  const [title, setTitle] = useState(''); // 제목
  const [price, setPrice] = useState(0); // 가격
  const [deal, setDeal] = useState('판매하기'); // 거래 방식
  const [content, setContent] = useState(''); // 자세한 설명
  const [image, setImage] = useState([]); // 이미지

  const [noTitle, setNoTitle] = useState(false); // 제목 없음
  const [noContent, setNoContent] = useState(false); // 내용 없음
  const [noCategory, setNoCategory] = useState(false); // 카테고리 없음

  const categories = ['디지털/가전', '가구/인테리어', '의류', '도서/티켓/음반/게임', '뷰티/미용', '기타'];
  const [selectedCategory, setSelectedCategory] = useState(null); // 카테고리

  // 게시물 상세 데이터 가져오기
  useEffect(() => {
    getPostDetail();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (post){
      updateCategoryIndex(post.category);
    }
  }, [post])

  /**
   * 게시물 상세 데이터 가져오는 함수
   */
  const getPostDetail = () => {
    axios.get(`http://${Config.DB_IP}/posts/${route.params.postId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        timeout: 2000, // 타임아웃을 2초로 설정
      })
      .then(response => {
        if (response.status === 200) {
          setPost(response.data);
          setImage(response.data.postImages);
          setTitle(response.data.postTitle);
          setPrice(response.data.price);
          setDeal(response.data.price > 0 ? '판매하기' : '나눔하기');
          setContent(response.data.content);
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
          console.log('PostsList error.response', error.response);
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
          console.log('PostsList Unexpected error', error.message);
        }
      });
  }

  /**
   * 카테고리 인덱스 업데이트 함수
   */
  const updateCategoryIndex = (category) => {
    if (category === 'ELECTRONICS') {
      setSelectedCategory(0);
    } else if (category === 'FURNITURE') {
      setSelectedCategory(1);
    } else if (category === 'CLOTHING') {
      setSelectedCategory(2);
    } else if (category === 'BOOKS_TICKETS_RECORDS_GAMES') {
      setSelectedCategory(3);
    } else if (category === 'BEAUTY') {
      setSelectedCategory(4);
    } else if (category === 'ETC') {
      setSelectedCategory(5);
    }
  };

  const convertCategoryMapping = (index) => {
    switch (index) {
      case 0:
        return 'ELECTRONICS';
      case 1:
        return 'FURNITURE';
      case 2:
        return 'CLOTHING';
      case 3:
        return 'BOOKS_TICKETS_RECORDS_GAMES';
      case 4:
        return 'BEAUTY';
      case 5:
        return 'ETC';
    }
  }

  /**
   * 갤러리에서 사진 가져오는 함수
   */
  const handleImageLibrary = () => {
    if (image.length === 10) {
      setAlertMessage(`사진은 최대 10장까지 선택할 수 있습니다.`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
    }
    else {
    // 갤러리 사진 불러오기
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10, // 최대 10장
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          // 취소 했을 때
          setAlertMessage(`사진 선택을 취소했습니다.`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        } else if (response.errorCode) {
          // 오류가 발생했을 때
          setAlertMessage(
            `오류가 발생했습니다. \n[${response.errorCode}] ${response.errorMessage}`,
          );
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        } else {
          // 사진을 선택 했을 때
          // 각 사진마다 uri를 image에 저장
          response.assets.forEach(asset => {
            setImage(prev => [...prev, asset.uri]);
          });
        }
      },
    );
  }
  }

  /**
   * 카테고리 렌더링 함수
   */
  const renderCategory = (start, end) => {
    return (
      <View style={styles.toggleContainer}>
        {categories.slice(start, end).map((category, index) => (
          <TouchableOpacity 
          key={index}
          style={[styles.toggle, selectedCategory === index + start && styles.selectedToggle]}
          onPress={() => {
            setSelectedCategory(index + start) // 선택한 카테고리
            setNoCategory(false); // 카테고리가 있다면 경고문구 삭제
          }}
        >
          <Text style={[styles.toggleText, selectedCategory === index + start && styles.selectedToggleText]}>{category}</Text>
        </TouchableOpacity>
        ))}
      </View>
    );
  };

  /**
   * 게시물 수정 함수
   */
  const handleEditPost = () => {
    // 제목이 없다면
    !titleCheck(title) && setNoTitle(true);
    // 내용이 없다면
    !contentCheck(content) && setNoContent(true);
    // 카테고리가 없다면
    (selectedCategory === null) && setNoCategory(true);

    // 제목과 내용이 있다면
    if ( titleCheck(title) && contentCheck(content) && selectedCategory !== null ) {
      !price && setPrice(0); // 가격이 없다면 0으로 초기화
      
      // formData 형식
      const formData = new FormData();
      image.forEach((uri, index) => {
        formData.append('postImage', {
          name: `postImage${index}.jpg`,
          type: 'image/jpeg',
          uri: uri,
        });
      });
      formData.append('category', convertCategoryMapping(selectedCategory));
      formData.append('content', content);
      formData.append('postTitle', title);
      formData.append('price', price);

      axios.put(
          `http://${Config.DB_IP}/post/${post.id}`,
          formData,
          {headers: {
              'Content-Type': 'multipart/form-data', // 파일 형식
              'Authorization': `Bearer ${userData.token}` // 로그인 토큰
            },
            timeout: 2000, // 2초 타임아웃
          }
        )
        .then(() => {
          // 게시물 상세 페이지로 이동
          navigation.navigate('PostStack', {
            screen: 'PostDetail',
            params: {postId: post.id},
          })
        })
        .catch(error => {
          if (error.response) {
            // 요청은 성공했으나 응답은 실패
            setAlertMessage(`${error.response.data}`);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 6000);
            console.error(
              'postEdit error.response',
              error.response.data,
            );
          } else if (error.request) {
            // timeout으로 요청 실패
            setAlertMessage(
              '서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.',
            ); // 오류 메시지
            setShowAlert(true); // 오류 알림창
            setTimeout(() => {
              setShowAlert(false);
            }, 6000); // 6초 후 알림창 사라짐
          } else {
            // 기타 오류 발생
            setAlertMessage(
              `오류가 발생했습니다. \n[${error.message}]`,
            );
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 6000);
            console.error('postEdit Unexpected error', error.message);
          }
        });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.inlineContainer}>
        <TouchableOpacity
          style={shared.iconButton}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[shared.text, styles.mainText]}>중고거래 글 수정하기</Text>
      </View>

      <ScrollView style={[shared.container, styles.container]}>
        <View style={styles.content}>
        
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleImageLibrary}>
              <Icon
                style={styles.grayText}
                name="camera"
                size={25}
                color="#868b94"
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={
                    image.length === 0 ? styles.grayText : styles.redText
                  }>{`${image.length}`}</Text>
                <Text style={styles.grayText}>/10</Text>
              </View>
            </TouchableOpacity>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {image.length !== 0 && (
                <View style={shared.inlineContainer}>
                  {image.map((uri, index) => (
                    <View style={styles.previewImageContainer} key={uri}>
                      <Image style={styles.previewImage} source={{uri}} />
                      <TouchableOpacity
                        key={index}
                        style={styles.closeIcon}
                        onPress={() => {
                          temp = [...image];
                          temp.splice(index, 1);
                          setImage(temp);
                        }}>
                        <Icon name="close-circle" size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>

          <Text style={styles.inputTag}>제목</Text>
          <TextInput
            style={[
              shared.blankTextInput,
              noTitle && {borderColor: '#dc645b', borderWidth: 1},
            ]}
            onChangeText={text => {
              setTitle(text);
              setNoTitle(false); // 제목이 있다면 경고문구 삭제
            }}
            inputMode="text"
            placeholder="제목"
            placeholderTextColor="#676c74"
            value={title}
          />
          {noTitle && (
            <View style={shared.inlineContainer}>
              <Icon name="alert-circle" size={15} color="#dc645b" />
              <Text style={styles.alertText}> 제목을 적어주세요.</Text>
            </View>
          )}

          <Text style={styles.inputTag}>카테고리</Text>
          <View>{renderCategory(0, 3)}</View>
          <View>{renderCategory(3, 6)}</View>
          {noCategory && (
            <View style={shared.inlineContainer}>
              <Icon name="alert-circle" size={15} color="#dc645b" />
              <Text style={styles.alertText}> 카테고리를 지정해 주세요.</Text>
            </View>
          )}

          <Text style={styles.inputTag}>거래 방식</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggle,
                deal === '판매하기' && styles.selectedToggle,
              ]}
              onPress={() => setDeal('판매하기')}>
              <Text
                style={[
                  styles.toggleText,
                  deal === '판매하기' && styles.selectedToggleText,
                ]}>
                판매하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggle,
                deal === '나눔하기' && styles.selectedToggle,
              ]}
              onPress={() => {
                setDeal('나눔하기');
                setPrice(0); // 가격 초기화
              }}>
              <Text
                style={[
                  styles.toggleText,
                  deal === '나눔하기' && styles.selectedToggleText,
                ]}>
                나눔하기
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[
              shared.blankTextInput,
              deal === '나눔하기' && shared.textInput,
            ]}
            onChangeText={text => setPrice(text)}
            inputMode="numeric"
            keyboardType="numeric"
            placeholder={deal === '나눔하기' ? '₩ 0' : '₩ 가격을 입력해주세요'}
            editable={deal !== '나눔하기'}
            placeholderTextColor="#676c74"
            value={deal === '판매하기' && price.toString()}
          />

          <Text style={styles.inputTag}>자세한 설명</Text>
          <TextInput
            style={[
              shared.blankTextInput,
              noContent && {borderColor: '#dc645b', borderWidth: 1},
            ]}
            onChangeText={text => {
              setContent(text);
              setNoContent(false); // 내용이 있다면 경고문구 삭제
            }}
            inputMode="text"
            placeholder={
              '게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)\n\n신뢰할 수 있는 거래를 위해 자세히 적어주세요.\n과학기술정보통신부, 한국 인터넷진흥원과 함께 해요.\n'
            }
            multiline={true} // 여러 줄의 텍스트
            textAlignVertical="top" // 커서를 위쪽에 배치
            placeholderTextColor="#676c74"
            value={content}
          />
          {noContent && (
            <View style={shared.inlineContainer}>
              <Icon name="alert-circle" size={15} color="#dc645b" />
              <Text style={styles.alertText}> 설명을 적어주세요.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <KeyboardAvoidingView enabled={false}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[shared.redButton, styles.button]}
            onPress={handleEditPost}>
            <Text style={styles.buttonText}>작성 완료</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {showAlert && <Alert message={alertMessage} />}
    </>
  );
};

/**
 * title 내용이 있는 지 체크
 * @param {text} title 
 * @returns 있다면 true, 없다면 false
 */
const titleCheck = (title) => {
  return title === '' ? false : true;
};

/**
 * content 내용이 있는 지 체크
 * @param {text} content 
 * @returns 
 */
const contentCheck = (content) => {
  return content === '' ? false : true;
};

export default PostEdit;