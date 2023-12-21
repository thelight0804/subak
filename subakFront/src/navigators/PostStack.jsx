import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostDetail from '../pages/post/PostDetail';

const PostStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostDetail" component={PostDetail}/>
    </Stack.Navigator>
  )
}

export default PostStack;