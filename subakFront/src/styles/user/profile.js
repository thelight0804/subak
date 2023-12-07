import { StyleSheet } from 'react-native';

// color palette
var colorBackground = '#212123';
var text = 'white';
var grayText = '#868b94';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#37373a',
  },
  mainText: {
    fontSize: 16,
    paddingBottom: 8,
  },
  profileImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  content: {
    marginTop: 10,
  }
})

export default styles;