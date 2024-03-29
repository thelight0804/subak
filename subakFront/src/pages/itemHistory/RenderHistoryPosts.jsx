import { TouchableOpacity, View, Image, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import styles from "../../styles/post/postsList";
import CommaPrice from "./../components/CommaPrice";
import { shared } from "../../styles/shared";

/**
 * 포스트 컴포넌트 렌더링 함수
 * @param {item} item 게시글
 * @returns 포스트 컴포넌트
 */
const RenderHistoryPosts = ({item, navigation}) => {
  const noPostImage = './../../assets/image/noPostImage.png';

  return (
    <TouchableOpacity
      style={[styles.postContainer, {borderBottomWidth: 0}]}
      onPress={() =>
        navigation.navigate('PostStack', {
          screen: 'PostDetail',
          params: {postId: item.id},
        })
    }>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={item.firstImage ? {uri: item.firstImage} : require(noPostImage)}
        />
      </View>
      <View style={styles.postContentContainer}>
        <Text style={styles.title}>{item.postTitle}</Text>
        <Text style={[styles.grayText, styles.address]}>{`${item.address}ㆍ${item.postDateTime}`}</Text>
        <Text style={styles.price}>
          {item.price === 0 ? (
              <Text>
                나눔 <Icon name="heart" size={15} color="#dc645b" />
              </Text>
            ) : (
              `${CommaPrice(item.price)}원`
            )}
        </Text>
        <View style={[shared.inlineContainer, {justifyContent: 'flex-end'}]}>
          <View style={styles.countContainer}>
            <Text style={[styles.grayText, styles.commentCount]}>{item.commentCount}</Text>
            <Icon name="chatbubbles-outline" size={18} color="#868b94" />
          </View>
          <View style={styles.countContainer}>
            <Text style={[styles.grayText, styles.heartCount]}>{item.heartCount}</Text>
            {item.hearted ? (
              <Icon name="heart" size={18} color="#dc645b" />
            ) : (
              <Icon name="heart-outline" size={18} color="#868b94" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderHistoryPosts;