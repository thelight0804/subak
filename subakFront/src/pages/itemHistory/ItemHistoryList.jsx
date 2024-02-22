import { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/itemHistory/itemHistoryList';
import Loading from '../components/Loading';
import ItemTabs from './ItemTabs';

const ItemHistoryList = ({navigation}) => {
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const profileImg = userData.image ? {uri: userData.image} : require('../../assets/image/user-profile.png'); // 프로필 이미지

  return (
    <View style={shared.container}>
      <TouchableOpacity
        style={[shared.iconButton, {marginBottom: 10}]}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={[shared.inlineContainer, {justifyContent: 'space-between', marginBottom: 10}]}>
        <View>
          <Text style={styles.header}>나의 판매내역</Text>
          <TouchableOpacity
            style={[shared.grayButton, {width: 80,}]}
            // onPress={() => navigation.navigate('PostStack', {screen: 'NewPost'})}>
            //TODO: 코드 초기화
            // onPress={() => navigation.navigate('PostStack', {screen: 'ReviewDetail'})}>
            onPress={() =>
              navigation.navigate('PostStack', {
                screen: 'BuyerReview',
              })
            }>
            <Text style={shared.text}>글쓰기</Text>
          </TouchableOpacity>
        </View>
        <Image 
          style={styles.profileImage}
          source={profileImg}
        />
      </View>

      <ItemTabs/>

    </View>
  );
};

export default ItemHistoryList;