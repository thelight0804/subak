import { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';

import { shared } from '../../styles/shared';

import styles from '../../styles/review/newReview';
import Alert from '../components/Alert';

const NewReview = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const buyerName = route.params.buyerName; // 구매자 이름
  const postTitle = route.params.postTitle; // 게시글 제목
  const postId = route.params.postId; // 테스트용 게시글 아이디

  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  const [content, setContent] = useState(''); // 리뷰 내용
  const [noContent, setNoContent] = useState(false); // 내용 없음 경고

  /**
   * 작성 완료 버튼을 눌렀을 때
   */
  const handleReviewSubmit = () => {
    if (!contentCheck(content)) { // 내용이 없다면 경고문구 표시
      setNoContent(true);
      return;
    }
    else { // 내용이 있다면 리뷰 작성 요청
      updateReview();
    }
  }

  /**
   * 리뷰 작성 요청 함수
   */
  const updateReview = () => {
    axios.post(`http://${Config.DB_IP}/reviews/${postId}`, {
      reviewContent: content,
    }, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      timeout: 2000,
    })
    .then((res) => {
      console.log(res.data);
      navigation.navigate('SellerReview', {
        buyerName: buyerName,
        postTitle: postTitle,
        sellerReview: content,
      });
    })
    .catch((error) => {
      setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      console.log('handleReviewSubmit error.response : ', error.response.data);
    });
  }



  return (
    <>
      <View style={shared.container}>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="close" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>리뷰 작성하기</Text>
        </View>

        <View style={styles.content}>
          <TextInput
            style={[
              shared.blankTextInput,
              noContent && {borderWidth: 1, borderColor: '#dc645b'},
            ]}
            onChangeText={text => {
              setContent(text);
              setNoContent(false); // 내용이 있다면 경고문구 삭제
            }}
            inputMode="text"
            placeholder={"따뜻한 리뷰를 작성해주세요."}
            multiline={true} // 여러 줄의 텍스트
            textAlignVertical="top" // 커서를 위쪽에 배치
            placeholderTextColor="#676c74"
          />
          {noContent && (
            <View style={shared.inlineContainer}>
              <Icon name="alert-circle" size={15} color="#dc645b" />
              <Text style={styles.alertText}> 리뷰를 적어주세요.</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[shared.redButton, styles.button]}
            onPress={handleReviewSubmit}
          >
            <Text style={styles.buttonText}>작성 완료</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showAlert && <Alert message={alertMessage} />}
    </>
  );
};

/**
 * content 내용이 있는 지 체크
 * @param {text} content 
 * @returns {boolean} content가 있는지 여부
 */
const contentCheck = (content) => {
  return content === '' ? false : true;
};

export default NewReview;