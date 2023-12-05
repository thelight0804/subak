import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/likes/LikesList';

import FooterMenu from '../components/FooterMenu';

const LikesList = ({navigation}) => {
  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.content}>
          <Text style={shared.text}>LikesList</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <FooterMenu selectedIndex={1} navigation={navigation}/>
      </View>
    </>
  )
};

export default LikesList;