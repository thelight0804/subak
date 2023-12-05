// 홈, 동네생활, 내 근처, 나의 당근 메뉴 footer
import {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/Shared';
import styles from '../../styles/components/FooterMenu';

const FooterMenu = ({selectedIndex, navigation}) => {
  const [selectIndex, setSelectIndex] = useState(selectedIndex); // 선택된 메뉴 인덱스
  const menuItems = [
    {
      label: '홈',
      icon:
        selectIndex === 0 ? (
          <Icon name="home-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="home-outline" size={25} color="#ffffff" />
        ),
      link: 'PostsList',
    },
    {
      label: '관심목록',
      icon:
        selectIndex === 1 ? (
          <Icon name="heart-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="heart-outline" size={25} color="#ffffff" />
        ),
      link: 'LikesList'
    },
    {
      label: '판매내역',
      icon:
        selectIndex === 2 ? (
          <Icon name="receipt-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="receipt-outline" size={25} color="#ffffff" />
        ),
      link: 'ItemHistoryList'
    },
    {
      label: '나의 수박',
      icon:
        selectIndex === 3 ? (
          <Icon name="person-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="person-outline" size={25} color="#ffffff" />
        ),
      link: 'MyPage'
    },
  ];

  const navigateHandler = (index) => {
    console.log(index);
    setSelectIndex(index);
    navigation.navigate(menuItems[index].link);
  }

  return (
    <View style = {styles.container}>
      {menuItems.map((item, i) => (
        <TouchableOpacity 
          key={i} 
          style={styles.menuBox}
          onPress={() => navigateHandler(i)}
        >
          <View style={styles.icon}>{item.icon}</View>
          <Text style={[shared.text, styles.label]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterMenu;