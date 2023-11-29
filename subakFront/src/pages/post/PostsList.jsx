import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/post/PostsList';

import FooterMenu from '../components/FooterMenu';

const PostsList = () => {
  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.content}>
          
        </View>
      </View>
      <View style={styles.footer}>
        <FooterMenu selectedIndex={0} />
      </View>
    </>
  )
};

export default PostsList;