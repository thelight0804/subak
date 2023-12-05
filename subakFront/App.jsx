import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigators/DrawerNavigator';

import { Provider } from 'react-redux';
import { Persistor, store } from './src/data/store/store';
import { PersistGate } from 'redux-persist/integration/react';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  // splash-screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={Persistor} > */}
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}


export default App;