import {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Config from 'react-native-config';

import { shared } from '../../styles/shared';
import styles from '../../styles/user/editProfile';
import Alert from '../components/Alert';
import ChoiceModal from '../components/ChoiceModal';


const PostsList = ({navigation}) => {
  // TODO: userData를 실제 서버를 통해서 받아와야 합니다
  const [userData, setUserData] = useState({
    name: '카레',
    id: '#12345678',
    mannersTemperature: 36.5,
  }); // 유저 정보
  const prevProfileImg = '../../assets/image/user-profile.png'; // 기존 프로필 이미지
  const [profileImg, setProfileImg] = useState(null); // 업로드 되는 프로필 이미지

  const [prevName, setPrevName] = useState(userData.name); // 이전 닉네임
  const [newName, setNewName] = useState(userData.name); // 닉네임
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지
  const [openModal, setOpenModal] = useState(false); // 모달 창
  const [modalIndex, setModalIndex] = useState(-1); // 모달 선택 인덱스

  // 내용이 변경 되었는지 확인
  const changeData = () => {
    return (newName !== prevName && newName.length !== 0) || profileImg;
  }

  // 사진 불러오기
  const getPhoto = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    }, (response) => {
      if (response.assets){ // 사진을 선택 했을 때
        setProfileImg(response.assets[0].uri);
        console.log(response);
      }
      else if (response.didCancel){ // 취소 했을 때
        setAlertMessage(`사진 선택을 취소했습니다.`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      }
      else { // 오류 발생 했을 때
        setAlertMessage(`오류가 발생했습니다. \n[${response.errorCode}] ${response.errorMessage}`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      }
    });
  }

  // 모달 선택 버튼에 따라 실행
  useEffect(() => {
    if (modalIndex === 0) { // 프로필 사진 선택
      getPhoto();
    }
    else if (modalIndex === 1) { // 프로필 사진 삭제
      setProfileImg(null);
    }
    setModalIndex(-1); // 모달 선택 인덱스 초기화
    setOpenModal(false); // 모달 창 닫기
  }, [modalIndex]);

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
            onPress={() =>
              axios.post(`http://${Config.DB_IP}/user/${userData.id}/profile`,
                  {
                    name: newName,
                    profileImage: profileImg,
                  },
                  { timeout: 2000 },
                )
                .then(response => {
                  navigation.goBack();
                })
                .catch(error => { 
                  if (error.response) { // 요청은 성공했으나 응답은 실패
                    setAlertMessage(`${error.response.data}`);
                    setShowAlert(true);
                    setTimeout(() => {
                      setShowAlert(false);
                    }, 6000);
                    console.log('error.response', error.response.data);
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
                    console.log('Unexpected error', error.message);
                  }
               }
              )
            }
            disabled={!changeData()}>
            <Text style={[shared.text, styles.mainText, !changeData() && styles.enabled]}>
              완료
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => {
              // 미디어 이미지 권한 요청
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
              setOpenModal(true);
            }}>
            <Image
              style={styles.profileImage}
              source={profileImg ? {uri: profileImg} : require(prevProfileImg)}
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
              inputMode="text"
              placeholder="닉네임을 입력해주세요."
              placeholderTextColor="#676c74"
            />
          </View>
        </View>
      </View>
      {openModal && (
        <ChoiceModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setModalIndex={setModalIndex}
          choices={['앨범에서 선택', '프로필 사진 삭제']}
        />
      )}
      {showAlert && <Alert message={alertMessage} />}
    </>
  );
};

export default PostsList;