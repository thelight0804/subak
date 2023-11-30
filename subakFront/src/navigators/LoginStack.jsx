import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from '../pages/login/Start';
import AddressSearch from '../pages/login/AddressSearch';
import Login from '../pages/login/Login';
import SignUp from '../pages/login/SignUp';
import FindEmail from '../pages/login/FindEmail';
import FindPassword from '../pages/login/FindPassword';

const LoginStack = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start}/>
      <Stack.Screen name="AddressSearch" component={AddressSearch}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="FindEmail" component={FindEmail}/>
      <Stack.Screen name="FindPassword" component={FindPassword}/>
    </Stack.Navigator>
  )
}

export default LoginStack;