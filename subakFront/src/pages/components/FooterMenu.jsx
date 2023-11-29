// 홈, 동네생활, 내 근처, 나의 당근 메뉴 footer
import {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import shared from '../../styles/Shared';
import styles from '../../styles/components/FooterMenu';

const FooterMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 메뉴 인덱스
  const menuItems = [
    {label: '홈', icon: <Icon name="home-outline" size={25} color="#ffffff" />},
    {label: '동네생활', icon: <Icon name="newspaper-outline" size={25} color="#ffffff" />},
    {label: '내 근처', icon: <Icon name="location-outline" size={25} color="#ffffff" />},
    {label: '나의 수박', icon: <Icon name="person-outline" size={25} color="#ffffff" />},
  ]

  return (
    <View style = {styles.container}>
      {menuItems.map((item, i) => (
        <TouchableOpacity key={i} style={styles.menuBox}>
          <View style={styles.icon}>{item.icon}</View>
          <Text style={[shared.text, styles.label]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterMenu;