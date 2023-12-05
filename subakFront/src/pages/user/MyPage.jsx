import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/user/MyPage';

import FooterMenu from '../components/FooterMenu';

const MyPage = ({navigation}) => {
  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.content}>
          <Text style={shared.text}>MyPage</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <FooterMenu selectedIndex={3} navigation={navigation}/>
      </View>
    </>
  )
};

export default MyPage;