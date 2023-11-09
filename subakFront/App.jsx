import { useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Start from './src/pages/login/Start';

const App = () => {

  // splash-screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
      <View style={styles.container}>
        <Start />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212123',
  },
});


export default App;