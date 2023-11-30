import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import store from './src/data/store/store';

const App = () => {
  const Stack = createNativeStackNavigator(); //React navigation stack

  // splash-screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}


export default App;