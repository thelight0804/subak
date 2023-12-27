import { StyleSheet } from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#37373a',
    marginBottom: 16,
  },
  mainText: {
    fontSize: 16,
    paddingBottom: 8,
  },
  text: {
    textAlign: 'left',
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageText: {
    color: colorPalette.main,
  }
})

export default styles;