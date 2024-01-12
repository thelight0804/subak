import {React, useState} from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/postRecent';

import Alert from '../components/Alert';
import CommaPrice from '../components/CommaPrice';
import Config from 'react-native-config';

const PostRecent = ({navigation, route}) => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const price = route.params.postPrice;
  const [newPrice, setNewPrice] = useState(price);

  // 게시글 가격 변경
  const handleInputChange = (text) => {
    const inputPrice = parseInt(text.replace(/,/g, ''));
    if (!isNaN(inputPrice)) {
      setNewPrice(inputPrice);
    } else {
      setNewPrice(0);
    }
  }

  // 게시글 끌어올리기 함수
  const handleRecentRequest = () => {
    axios.put(`http://${Config.DB_IP}/post/${route.params.postId}/recent`,
      {
        price : newPrice
      },
      {
        headers: {
          'Authorization': `Bearer ${userData.token}` // 토큰 값을 추가
        },
        timeout: 2000 // 타임아웃을 2초로 설정
      }
    )
    .then(response => { navigation.goBack(); })
    .catch(error => { 
        if (error.response) { // 요청은 성공했으나 응답은 실패
          setAlertMessage(`${error.response.data}`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostRecent error.response', error.response.data);
        } else if (error.request) { // timeout으로 요청 실패
          setAlertMessage('서버와의 연결이 원활하지 않습니다. \n잠시 후 다시 시도해주세요.'); // 오류 메시지
          setShowAlert(true); // 오류 알림창
          setTimeout(() => {
            setShowAlert(false);
          }, 6000); // 6초 후 알림창 사라짐
        } else { // 기타 오류 발생
            setAlertMessage(`오류가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostRecent Unexpected error', error.message);
      }})
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={shared.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              style={[shared.iconButton, styles.backButton]}
              onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>지금 가격을 낮추고</Text>
          <Text style={styles.headerText}>게시글을 끌어올려 보세요</Text>
        </View>

        <View style={[styles.postContent, shared.inlineContainer]}>
          <Image style={styles.image} source={{uri: route.params.postImage}} />
          <View>
            <Text style={[shared.text, {fontWeight: 'normal'}]}>{route.params.postTitle}</Text>
            <Text style={[shared.text]}>{CommaPrice(price)}원</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.text, styles.wonText]}>원</Text>
          <TextInput
            style={shared.blankTextInput}
            value={ newPrice > 0 && CommaPrice(newPrice)}
            onChangeText={handleInputChange}
            inputMode="numeric"
            keyboardType="number-pad"
            placeholder={CommaPrice(price)}
            placeholderTextColor="#676c74"
          />
        </View>

        <View style={shared.inlineContainer}>
          <TouchableOpacity 
            style={[shared.grayButton, {marginRight: 10}]}
            onPress={() => setNewPrice(price)}
          >
            <Text style={[shared.text, styles.discountText]}>
              <Icon name="reload" size={17} color="#FFFFFF" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[shared.grayButton, {marginRight: 10}]}
            onPress={() => setNewPrice(discount(newPrice, 5))}
          >
            <Text style={[shared.text, styles.discountText]}>-5%</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[shared.grayButton, {marginRight: 10}]}
            onPress={() => setNewPrice(discount(newPrice, 10))}
          >
            <Text style={[shared.text, styles.discountText]}>-10%</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[shared.grayButton, {marginRight: 10}]}
            onPress={() => setNewPrice(discount(newPrice, 15))}
          >
            <Text style={[shared.text, styles.discountText]}>-15%</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[shared.redButton, styles.button]}
          onPress={() => handleRecentRequest()}>
          <Text style={styles.buttonText}>끌어올리기</Text>
        </TouchableOpacity>
      </View>

      {showAlert && <Alert message={alertMessage} />}
    </View>
  );
};

/**
 * 할인율에 따라 가격을 계산하는 함수
 * @param {number} price 기존 가격
 * @param {number} percent 할인율
 * @returns {number} 할인율이 적용된 가격
 */
const discount = (price, percent) => {
  const discount = price * (1 - percent / 100)
  return parseInt(discount);
}

export default PostRecent;