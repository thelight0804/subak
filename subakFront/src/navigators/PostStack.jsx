import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostDetail from '../pages/post/PostDetail';
import NewPost from '../pages/post/NewPost';
import PostEdit from '../pages/post/PostEdit';
import PostRecent from '../pages/post/PostRecent';
import BuyerReview from '../pages/review/BuyerReview';
import SellerReview from '../pages/review/SellerReview';
import NewReview from '../pages/review/NewReview';

const PostStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostDetail" component={PostDetail}/>
      <Stack.Screen name="NewPost" component={NewPost}/>
      <Stack.Screen name="PostEdit" component={PostEdit}/>
      <Stack.Screen name="PostRecent" component={PostRecent}/>
      <Stack.Screen name="BuyerReview" component={BuyerReview}/>
      <Stack.Screen name="SellerReview" component={SellerReview}/>
      <Stack.Screen name="NewReview" component={NewReview}/>
    </Stack.Navigator>
  )
}

export default PostStack;