import {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/Shared';
import styles from '../../styles/user/MyPageList';

const MyPage = ({navigation}) => {
  const [userName, setUserName] = useState('카레');


  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={[shared.iconButton, {paddingRight: 0}]}
              onPress={() => console.log("설정 톱니바퀴")}>
              <Ionicon name="settings-outline" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <View style={styles.leftContainer}>
              <Image 
                style={styles.profileImage}
                source={require('../../assets/image/user-profile.png')}
              />
              <Text style={[shared.text, {fontSize: 20}]}>{userName}</Text>
            </View>
            <TouchableOpacity
              style={shared.grayButton}
              onPress={() => console.log("프로필 보기")}>
              <Text style={[shared.text, {fontSize: 12}]}>프로필 보기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={[shared.text, styles.paragraph]}>나의 거래</Text>
          <View style={styles.inlineContainer}>
            
          </View>
        </View>
      </View>
    </>
  )
};

export default MyPage;