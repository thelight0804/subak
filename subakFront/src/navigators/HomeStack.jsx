import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategorySelection from '../pages/post/CategorySelection';
import CategoryPosts from '../pages/post/CategoryPosts';
import Search from '../pages/search/Search';

const HomeStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategorySelection" component={CategorySelection}/>
      <Stack.Screen name="CategoryPosts" component={CategoryPosts}/>
      <Stack.Screen name="Search" component={Search}/>
    </Stack.Navigator>
  )
}

export default HomeStack;