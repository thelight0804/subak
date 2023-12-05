import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import LoginStack from './LoginStack';
import FooterTabs from './FooterTabs';

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack
  const userLoggedIn = useSelector((state) => state.userData.token); // 로그인 여부

  return (
    <Stack.Navigator 
      initialRouteName={userLoggedIn ? "FooterTabs" : "LoginPage"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginPage" component={LoginStack}/>
      <Stack.Screen name="FooterTabs" component={FooterTabs}/>
    </Stack.Navigator>
  );
}

export default DrawerNavigator;