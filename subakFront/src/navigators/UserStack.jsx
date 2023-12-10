import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../pages/user/Profile';
import EditProfile from '../pages/user/EditProfile';

const UserStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="EditProfile" component={EditProfile}/>
    </Stack.Navigator>
  )
}

export default UserStack;