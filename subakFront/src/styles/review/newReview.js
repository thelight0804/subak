import { StyleSheet } from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  content: {
    marginBottom: 80,
  },
  inlineContainer: {
    top: 0,
    width: '100%',
    backgroundColor: colorPalette.background,
    paddingRight: 30,
    marginBottom: 20,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#37373a',
  },
  mainText: {
    fontSize: 16,
    paddingBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  alertText: {
    color: colorPalette.main,
    fontSize: 12,
    fontWeight: 'bold',
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonText: {
    color: colorPalette.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default styles;