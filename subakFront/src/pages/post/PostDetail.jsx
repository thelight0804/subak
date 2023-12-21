import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from "../../styles/shared";
import styles from "../../styles/post/postDetail"

const PostDetail = ({navigation, route}) => {
  const postId = route.params.postId;
  
  return (
    <View style={shared.container}>
    <View style={styles.header}>
      <View style={styles.inlineContainer}>
        <TouchableOpacity
          style={shared.iconButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
    <ScrollView style={styles.content}>
      
    </ScrollView>
  </View>
  );
};

export default PostDetail;