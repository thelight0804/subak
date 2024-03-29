import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import loginUser from '../data/store/loginUser';
import getStorageData from '../data/asyncStorage/getStorageData';

import LoginStack from './LoginStack';
import UserStack from './UserStack';
import FooterTabs from './FooterTabs';
import PostStack from './PostStack';
import HomeStack from './HomeStack';
import Loading from '../pages/components/Loading';
import { colorPalette } from '../styles/shared';

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 렌더링 방지 로딩
  
  useEffect(() => {
    getUserData(dispatch, setLoading);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <StatusBar
        backgroundColor={colorPalette.background}
        animated={true}
      />
      <Stack.Navigator 
        initialRouteName={userData.logined ? "FooterTabs" : "LoginStack"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginStack" component={LoginStack}/>
        <Stack.Screen name="FooterTabs" component={FooterTabs}/>
        <Stack.Screen name="HomeStack" component={HomeStack}/>
        <Stack.Screen name="PostStack" component={PostStack}/>
        <Stack.Screen name="UserStack" component={UserStack}/>
      </Stack.Navigator>
    </>
  );
}

async function getUserData(dispatch, setLoading) {
  const userData = await getStorageData('userData'); // 로컬에 저장된 유저 데이터 가져오기
  if (userData) {
    loginUser(userData, dispatch); // 유저 데이터 로그인
  }
  setLoading(false);
}

export default DrawerNavigator;