import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import getStorageData from '../data/asyncStorage/getStorageData';
import removeStorageData from '../data/asyncStorage/removeStorageData';

import LoginStack from './LoginStack';
import UserStack from './UserStack';
import FooterTabs from './FooterTabs';

import { setName, setPhone, setEmail, setAddress, setLogined, setToken } from '../data/store/userSlice';


const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData); // 유저 데이터

  useEffect(() => {
    const getUserData = getStorageData('userData');
    if (getUserData) {
      dispatch(setName(getUserData.name));
      dispatch(setPhone(getUserData.phone));
      dispatch(setEmail(getUserData.email));
      dispatch(setAddress(getUserData.address));
      // dispatch(setLogined(false));
      // FIX: 테스트 환경으로 로그인 상태 true
      dispatch(setLogined(true));
      dispatch(setToken(getUserData.token));
    }
  }, []);

  return (
    <Stack.Navigator 
      initialRouteName={userData.logined ? "FooterTabs" : "LoginPage"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginPage" component={LoginStack}/>
      <Stack.Screen name="UserStack" component={UserStack}/>
      <Stack.Screen name="FooterTabs" component={FooterTabs}/>
    </Stack.Navigator>
  );
}

export default DrawerNavigator;