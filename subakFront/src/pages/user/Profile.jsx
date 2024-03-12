import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { shared } from '../../styles/shared';
import styles from '../../styles/user/profile';
import Alert from '../components/Alert';


const PostsList = ({navigation}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const [profileImg, setProfileImg] = useState(userData.image ? {uri: userData.image} : require('../../assets/image/user-profile.png')); // 프로필 이미지
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  useFocusEffect(
    useCallback(() => {
      setProfileImg(userData.image ? {uri: userData.image} : require('../../assets/image/user-profile.png'))
    }, []),
  );

  return (
    <>
      <View style={shared.container}>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>프로필</Text>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => {
              setAlertMessage(`공유 기능은 준비 중입니다.`);
              setShowAlert(true);
              setTimeout(() => {
                setShowAlert(false);
              }, 6000);
            }}>
            <Icon name="share-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={shared.inlineContainer}>
            <Image 
              style={styles.profileImage}
              source={profileImg}
            />
            <Text style={shared.text}>{userData.name}</Text>
            <Text style={[shared.text, {color: '#868b94'}]}>{` ${userData.id}`}</Text>
          </View>
          <TouchableOpacity 
            style={shared.grayButton} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={[shared.text, {fontSize: 12}]}>프로필 수정</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showAlert && <Alert message={alertMessage} />}
    </>
  )
};

export default PostsList;