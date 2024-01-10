import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import loginUser from '../data/store/loginUser';
import getStorageData from '../data/asyncStorage/getStorageData';
import setStorageData from '../data/asyncStorage/setStorageData';
import removeStorageData from '../data/asyncStorage/removeStorageData';

import LoginStack from './LoginStack';
import UserStack from './UserStack';
import FooterTabs from './FooterTabs';
import logoutUser from '../data/store/logoutUser';
import PostStack from './PostStack';

const DrawerNavigator = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack
  const userData = useSelector((state) => state.userData); // 유저 데이터
  const dispatch = useDispatch();
  const [logined, setLogined] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태
  
  useEffect(() => {
    // 비동기 함수 처리
    const initializeData = async () => {
      // await setStorageData(userData, 'userData');
      const getUserData = await getStorageData('userData'); // 로컬에 저장된 유저 데이터 가져오기
      if (getUserData) {
        loginUser(getUserData, dispatch); // 유저 데이터 로그인
        console.log('통과')
      }
      else {
        logoutUser(dispatch); // 유저 데이터 로그아웃
      }
      await setStorageData(getUserData, 'userData'); // 유저 데이터 로컬에 저장
      setLoading(false); // 로딩 완료
    };
    initializeData(); // 비동기 함수 호출
  }, []);

  useEffect(() => {
    setLogined(userData.logined);
  }, [userData.logined]);

  return (
    <Stack.Navigator 
      initialRouteName={logined ? "FooterTabs" : "LoginStack"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginStack" component={LoginStack}/>
      <Stack.Screen name="UserStack" component={UserStack}/>
      <Stack.Screen name="FooterTabs" component={FooterTabs}/>
      <Stack.Screen name="PostStack" component={PostStack}/>
    </Stack.Navigator>
  );
}

export default DrawerNavigator;