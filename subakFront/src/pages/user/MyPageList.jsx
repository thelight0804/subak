import {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/shared';
import styles from '../../styles/user/myPageList';

const MyPage = ({navigation}) => {
  const [userName, setUserName] = useState('카레'); // 유저 이름
  const profileImg = '../../assets/image/user-profile.png'; // 프로필 이미지

  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={[shared.iconButton, {paddingRight: 0}]}
              onPress={() => console.log("설정 톱니바퀴")}>
              <Icon name="settings-outline" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.profile} 
            onPress={() => navigation.navigate('UserStack', 'Profile')}
          >
            <View style={styles.leftContainer}>
              <Image 
                style={styles.profileImage}
                source={require(profileImg)}
              />
              <Text style={[shared.text, {fontSize: 20}]}>{userName}</Text>
            </View>
            <View style={shared.grayButton}>
              <Text style={[shared.text, {fontSize: 12}]}>프로필 보기</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={[shared.text, styles.text]}>나의 거래</Text>
          <TouchableOpacity style={[shared.inlineContainer, styles.listButton]} onPress={() => console.log("관심목록")}>
            <Icon name="heart-outline" size={25} color="#ffffff" style={styles.icon}/>
            <Text style={[shared.text, styles.text]}>관심목록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[shared.inlineContainer, styles.listButton]} onPress={() => console.log("판매내역")}>
            <Icon name="receipt-outline" size={25} color="#ffffff" style={styles.icon}/>
            <Text style={[shared.text, styles.text]}>판매내역</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[shared.inlineContainer, styles.listButton]} onPress={() => console.log("구매내역")}>
            <Icon name="bag-outline" size={25} color="#ffffff" style={styles.icon}/>
            <Text style={[shared.text, styles.text]}>구매내역</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
};

export default MyPage;