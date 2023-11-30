import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import LoginStack from './LoginStack';
import PostStack from './PostStack';

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack
  const userLoggedIn = useSelector((state) => state.userData.token); // 로그인 여부
  console.log(useSelector((state) => state.userData));

  return (
    <Stack.Navigator 
      initialRouteName={userLoggedIn ? "PostPage" : "LoginPage"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginPage" component={LoginStack}/>
      <Stack.Screen name="PostPage" component={PostStack}/>
    </Stack.Navigator>
  );
}

export default DrawerNavigator;