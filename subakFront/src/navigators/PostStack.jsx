import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostDetail from '../pages/post/PostDetail';
import NewPost from '../pages/post/NewPost';

const PostStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostDetail" component={PostDetail}/>
      <Stack.Screen name="NewPost" component={NewPost}/>
    </Stack.Navigator>
  )
}

export default PostStack;