import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/user/MyPage';

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
    </>
  )
};

export default MyPage;