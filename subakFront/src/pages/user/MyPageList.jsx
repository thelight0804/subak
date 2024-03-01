import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { shared } from '../../styles/shared';
import styles from '../../styles/user/myPageList';

const MyPage = ({navigation}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const profileImg = userData.image ? {uri: userData.image} : require('../../assets/image/user-profile.png'); // 프로필 이미지

  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={[shared.iconButton, {paddingRight: 0}]}
              onPress={() => navigation.navigate('UserStack', {screen: 'Setting'})}>
              <Icon name="settings-outline" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.profile} 
            onPress={() => navigation.navigate('UserStack', {screen: 'Profile'})}
          >
            <View style={styles.leftContainer}>
              <Image 
                style={styles.profileImage}
                source={profileImg}
              />
              <Text style={[shared.text, {fontSize: 20}]}>{userData.name}</Text>
            </View>
            <View style={shared.grayButton}>
              <Text style={[shared.text, {fontSize: 12}]}>프로필 보기</Text>
            </View>
          </TouchableOpacity>

        </View>
        <View style={styles.content}>
          <Text style={[shared.text, styles.text]}>나의 거래</Text>

          <TouchableOpacity 
            style={[shared.inlineContainer, styles.listButton]} 
            onPress={() => navigation.navigate('LikesList', { screen: 'LikesList' })}
          >
            <Icon name="heart-outline" size={25} color="#ffffff" style={styles.icon}/>
            <Text style={[shared.text, styles.text]}>관심목록</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[shared.inlineContainer, styles.listButton]}
            onPress={() => navigation.navigate('ItemHistoryList', { screen: 'ItemHistoryList' })}
          >
            <Icon name="receipt-outline" size={25} color="#ffffff" style={styles.icon}/>
            <Text style={[shared.text, styles.text]}>판매내역</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[shared.inlineContainer, styles.listButton]} 
            onPress={() => navigation.navigate('UserStack', {screen: 'PurchaseHistory'})}
          >
            <Icon name="bag-outline" size={25} color="#ffffff" style={styles.icon}/>
            <Text style={[shared.text, styles.text]}>구매내역</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
};

export default MyPage;