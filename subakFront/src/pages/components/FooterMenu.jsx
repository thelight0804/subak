// 홈, 동네생활, 내 근처, 나의 당근 메뉴 footer
import {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/Shared';
import styles from '../../styles/components/FooterMenu';

const FooterMenu = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex); // 선택된 메뉴 인덱스
  const menuItems = [
    {
      label: '홈',
      icon:
        selectedIndex === 0 ? (
          <Icon name="home-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="home-outline" size={25} color="#ffffff" />
        ),
      link: 'Home',
    },
    {
      label: '동네생활',
      icon:
        selectedIndex === 1 ? (
          <Icon name="newspaper-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="newspaper-outline" size={25} color="#ffffff" />
        ),
      link: 'NearNews'
    },
    {
      label: '내 근처',
      icon:
        selectedIndex === 2 ? (
          <Icon name="location-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="location-outline" size={25} color="#ffffff" />
        ),
      link: 'Near'
    },
    {
      label: '나의 수박',
      icon:
        selectedIndex === 3 ? (
          <Icon name="person-sharp" size={25} color="#ffffff" />
        ) : (
          <Icon name="person-outline" size={25} color="#ffffff" />
        ),
      link: 'MyPage'
    },
  ];

  const navigateHandler = (index) => {
    setSelectedIndex(index);
    // navigation.navigate(menuItems[index].link);
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