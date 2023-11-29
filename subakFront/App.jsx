import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/pages/login/Start';
import AddressSearch from './src/pages/login/AddressSearch';
import Login from './src/pages/login/Login';
import SignUp from './src/pages/login/SignUp';
import FindEmail from './src/pages/login/FindEmail';
import FindPassword from './src/pages/login/FindPassword';
import PostsList from './src/pages/post/PostsList';

const App = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  // splash-screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={Start} options={{headerShown: false}}/>
          <Stack.Screen name="AddressSearch" component={AddressSearch} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
          <Stack.Screen name="FindEmail" component={FindEmail} options={{headerShown: false}}/>
          <Stack.Screen name="FindPassword" component={FindPassword} options={{headerShown: false}}/>
          <Stack.Screen name="PostsList" component={PostsList} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;