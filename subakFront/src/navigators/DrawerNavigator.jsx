import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import LoginStack from './LoginStack';
import MainStack from './MainStack';

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack
  const userLoggedIn = useSelector((state) => state.userData.token); // 로그인 여부
  console.log(useSelector((state) => state.userData));

  return (
    <Stack.Navigator 
      initialRouteName={userLoggedIn ? "MainStack" : "LoginPage"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginPage" component={LoginStack}/>
      <Stack.Screen name="MainStack" component={MainStack}/>
    </Stack.Navigator>
  );
}

export default DrawerNavigator;