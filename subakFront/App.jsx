import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './src/pages/login/Start';

const App = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  // splash-screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="start" component={Start} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;