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
    <Stack.Navigator>
      <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
      <Stack.Screen name="AddressSearch" component={AddressSearch} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
      <Stack.Screen name="FindEmail" component={FindEmail} options={{headerShown: false}}/>
      <Stack.Screen name="FindPassword" component={FindPassword} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default LoginStack;