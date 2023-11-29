import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/post/PostsList';

import FooterMenu from '../components/FooterMenu';

const PostsList = () => {
  return (
    <View style={shared.container}>
      <View style={styles.header}>

      </View>
      <View style={styles.content}>
        
      </View>
      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </View>
  )
};

export default PostsList;