import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/likes/LikesList';

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