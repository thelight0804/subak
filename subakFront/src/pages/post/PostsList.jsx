import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/post/PostsList';

const PostsList = ({navigation}) => {
  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.content}>
          <Text style={shared.text}>PostsList</Text>
        </View>
      </View>
    </>
  )
};

export default PostsList;