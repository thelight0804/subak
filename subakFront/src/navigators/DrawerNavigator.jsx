import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import loginUser from '../data/store/loginUser';
import getStorageData from '../data/asyncStorage/getStorageData';

import LoginStack from './LoginStack';
import UserStack from './UserStack';
import FooterTabs from './FooterTabs';

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const [logined, setLogined] = useState(false); // 로그인 여부

  useEffect(() => {
    console.log(userData);
    // const getUserData = getStorageData('userData');
    // console.log(userData);
    // if (getUserData) { // 로컬에 유저 데이터가 있으면
    //   // loginUser(userData, dispatch);
    //   setLogined(true);
    // }
    // else {
    //   setLogined(false);
    // }
  }, []);

  return (
    <Stack.Navigator 
      initialRouteName={logined ? "FooterTabs" : "LoginStack"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginStack" component={LoginStack}/>
      <Stack.Screen name="UserStack" component={UserStack}/>
      <Stack.Screen name="FooterTabs" component={FooterTabs}/>
    </Stack.Navigator>
  );
}

export default DrawerNavigator;