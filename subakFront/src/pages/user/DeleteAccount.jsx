import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/user/deleteAccount';
import Alert from '../components/Alert';
import logoutUser from '../../data/store/logoutUser';

const DeleteAccount = ({navigation}) => {
  const userData = useSelector((state) => state.userData); // 유저 이메일
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  /**
   * 회원 탈퇴 핸들러
   */
  deleteAccount = () => {
    axios.patch(`http://${Config.DB_IP}/user/withdraw`,
        {email: userData.email}, // 데이터
        { // 설정 옵션 부분
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
          timeout: 2000,
        },
      )
      .then(response => {
        navigation.navigate('LoginStack', {screen: 'Start'}); // 로그인 화면으로 이동
        logoutUser(dispatch); // Redux store에서 유저 데이터 제거
      })
      //...중략
      .then(response => {
        navigation.navigate('LoginStack', {screen: 'Start'}); // 로그인 화면으로 이동
        logoutUser(dispatch); // Redux store에서 유저 데이터 제거
      })
      .catch(error => {
        if (error.response) {
          // 요청은 성공했으나 응답은 실패
          setAlertMessage(`${error.response.data}`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.error('DeleteAccount error.response : ', error.response.data);
        } else if (error.request) {
          // timeout으로 요청 실패
          setAlertMessage(
            '서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.',
          ); // 오류 메시지
          setShowAlert(true); // 오류 알림창
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.error('DeleteAccount error.request : ', error.request);
        } else {
          // 요청 실패
          setAlertMessage(
            '알 수 없는 오류가 발생했습니다. \n잠시 후 다시 시도해주세요.',
          ); // 오류 메시지
          setShowAlert(true); // 오류 알림창
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.error('DeleteAccount error.message : ', error.message);
        }
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
        <Text style={styles.headerText}>탈퇴하기</Text>
        <View style={shared.iconButton}></View>
        </View>

        <View style={styles.content}>
          <Text style={styles.mainText}>
            {`..${userData.name}님과 이별인가요? 너무 아쉬워요.`}
          </Text>
          <Text style={styles.contentText}>
            계정을 삭제하면 매너온도, 게시글, 관심, 댓글 등 모든 활동 정보가 삭제됩니다.
            계정 삭제 후 7일간 다시 가입할 수 없어요.
          </Text>
          <View style={shared.inlineContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, {flex: 1}]}
              onPress={() => navigation.goBack()}>
              <Text style={shared.text}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[shared.redButton, {flex: 1}]}
              onPress={deleteAccount}>
              <Text style={shared.text}>탈퇴하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showAlert && <Alert message={alertMessage} />}
    </>
  )
};

export default DeleteAccount;