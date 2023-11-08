import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  // splash-screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>
        Hello React-native!
      </Text>
    </View>
  );
}

export default App;