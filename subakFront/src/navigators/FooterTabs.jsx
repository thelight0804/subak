import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FooterMenu from '../pages/components/FooterMenu';
import PostsList from '../pages/post/PostsList';
import LikesList from '../pages/likes/LikesList';
import ItemHistoryList from '../pages/itemHistory/ItemHistoryList';
import MyPageList from '../pages/user/MyPageList';

const FooterTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
      screenOptions={{ headerShown: false }}
      tabBar={props => <FooterMenu {...props}/>} // 커스텀 탭 바
      backBehavior="history" // 뒤로가기 버튼을 눌렀을 때
    >
      <Tab.Screen name="PostsList" component={PostsList}/>
      <Tab.Screen name="LikesList" component={LikesList}/>
      <Tab.Screen name="ItemHistoryList" component={ItemHistoryList}/>
      <Tab.Screen name="MyPageList" component={MyPageList}/>
    </Tab.Navigator>
  )
}

export default FooterTabs;