import { View, Text } from 'react-native';

import shared from '../../styles/shared';
import styles from '../../styles/likes/likesList';

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
    </>
  )
};

export default LikesList;