import {useState} from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/Shared';
import styles from '../../styles/user/EditProfile';
import Alert from '../components/Alert';


const PostsList = ({navigation}) => {
  const [userData, setUserData] = useState({
    name: '카레',
    id: '#12345678',
    mannersTemperature: 36.5,
  }); // 유저 정보
  const profileImg = '../../assets/image/user-profile.png'; // 프로필 이미지
  const [prevName, setPrevName] = useState(userData.name); // 이전 닉네임
  const [newName, setNewName] = useState(userData.name); // 닉네임
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  // 이름이 변경 되었는지 확인
  const changeName = () => {
    return newName !== prevName ? true : false;
  }

  return (
    <>
      <View style={shared.container}>
        <View style={styles.inlineContainer}>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[shared.text, styles.mainText]}>프로필 수정</Text>
          <TouchableOpacity
            style={shared.iconButton}
            onPress={() => {console.log('완료')}}
            disabled={!changeName()}
          >
            <Text style={[shared.text, styles.mainText, !changeName() && styles.enabled]}>완료</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.profile}
            onPress={() => {console.log('프로필 이미지 변경')}}
          >
            <Image 
              style={styles.profileImage}
              source={require(profileImg)}
            />
            <Image
              style={styles.cameraIcon}
              source={require('../../assets/image/circle-camera.jpg')}
            />
          </TouchableOpacity>
          <Text style={[shared.text, {textAlign: 'left'}]}>닉네임</Text>
          <View style={{marginTop: 10}}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setNewName(text)}
              value={newName}
              inputMode='text'
              placeholder="닉네임을 입력해주세요."
              placeholderTextColor="#676c74"
            />
          </View>
        </View>
      </View>
      {showAlert && <Alert message={alertMessage} />}
    </>
  )
};

export default PostsList;