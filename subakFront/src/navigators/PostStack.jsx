import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostDetail from '../pages/post/PostDetail';
import NewPost from '../pages/post/NewPost';
import PostEdit from '../pages/post/PostEdit';
import PostRecent from '../pages/post/PostRecent';
import CategorySelection from '../pages/post/CategorySelection';

const PostStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostDetail" component={PostDetail}/>
      <Stack.Screen name="NewPost" component={NewPost}/>
      <Stack.Screen name="PostEdit" component={PostEdit}/>
      <Stack.Screen name="PostRecent" component={PostRecent}/>
      <Stack.Screen name="CategorySelection" component={CategorySelection}/>
    </Stack.Navigator>
  )
}

export default PostStack;