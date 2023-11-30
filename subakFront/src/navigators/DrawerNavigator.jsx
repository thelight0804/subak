import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useSelector} from 'react-redux';

import LoginStack from './loginStack';
import PostStack from './PostStack';

const DrawerNavigator = () => {
  const Tab = createBottomTabNavigator(); //React navigation Tab
  const userLoggedIn = useSelector((state) => state.userData.token);
  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <Tab.Navigator>
      {console.log(userLoggedIn)}
      {userLoggedIn ? (
        <Tab.Screen name="Post" component={PostStack} options={{headerShown: false}} />
      ) : (
        <Tab.Screen name="Login" component={LoginStack} options={{headerShown: false}} />
      )}
    </Tab.Navigator>
  );
}

export default DrawerNavigator;