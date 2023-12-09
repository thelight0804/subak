// 홈, 관심목록, 판매내역, 나의 당근 메뉴 footer
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/shared';
import styles from '../../styles/components/footerMenu';

const FooterMenu = ({navigation, state}) => {
  const index = state.index; // 현재 화면의 인덱스

  const menuItems = [
    {
      label: '홈',
      icon:
        index === 0 ? (
          <Icon name="home-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="home-outline" size={25} color="#ffffff" />
        ),
      link: 'PostsList',
    },
    {
      label: '관심목록',
      icon:
        index === 1 ? (
          <Icon name="heart-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="heart-outline" size={25} color="#ffffff" />
        ),
      link: 'LikesList'
    },
    {
      label: '판매내역',
      icon:
        index === 2 ? (
          <Icon name="receipt-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="receipt-outline" size={25} color="#ffffff" />
        ),
      link: 'ItemHistoryList'
    },
    {
      label: '나의 수박',
      icon:
        index === 3 ? (
          <Icon name="person-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="person-outline" size={25} color="#ffffff" />
        ),
      link: 'MyPageList'
    },
  ];

  const navigateHandler = (index) => {
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