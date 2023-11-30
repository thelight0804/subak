import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostsList from '../pages/post/PostsList';

const PostStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator>
      <Stack.Screen name="PostsList" component={PostsList} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default PostStack;