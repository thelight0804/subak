// Login component styleSheet
import { StyleSheet } from 'react-native';

// color palette
var colorBackground = '#212123';
var text = 'white';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#eaebee',
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  Text: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;