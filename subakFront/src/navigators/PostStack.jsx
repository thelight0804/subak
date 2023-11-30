import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostsList from '../pages/post/PostsList';

const PostStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostsList" component={PostsList}/>
    </Stack.Navigator>
  )
}

export default PostStack;