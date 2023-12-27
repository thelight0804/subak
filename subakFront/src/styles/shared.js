import {StyleSheet} from 'react-native';

const colorPalette = {
  background: '#212123',
  white: 'white',
  gray: '#868b94',
  main: '#dc645b',
  error: '#DC3F3E',
};

const shared = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colorPalette.background,
  },
  text: {
    color: colorPalette.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  redButton: {
    width: 'auto',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,

    backgroundColor: colorPalette.main,
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  grayButton: {
    width: 'auto',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,

    backgroundColor: '#37373a',
    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    display: 'flex',
    paddingBottom: 15,
    paddingRight: 15
  },
  textInput: {
    width: '100%',
    backgroundColor: '#2a2e32',
    borderRadius: 8,
    paddingLeft: 10,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export {shared, colorPalette};