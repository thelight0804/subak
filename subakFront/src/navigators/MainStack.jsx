import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostsList from '../pages/post/PostsList';
import LikesList from '../pages/likes/LikesList';
import ItemHistoryList from '../pages/itemHistory/ItemHistoryList';
import MyPage from '../pages/user/MyPage';

const PostStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostsList" component={PostsList}/>
      <Stack.Screen name="LikesList" component={LikesList}/>
      <Stack.Screen name="ItemHistoryList" component={ItemHistoryList}/>
      <Stack.Screen name="MyPage" component={MyPage}/>
    </Stack.Navigator>
  )
}

export default PostStack;