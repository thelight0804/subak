import { StyleSheet } from 'react-native';

// color palette
var colorBackground = '#212123';
var text = 'white';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  header: {
    paddingBottom: 15,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconButton: {
    paddingBottom: 15,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  paragraph: {
    textAlign: 'left',
    fontSize: 16,
  },
})

export default styles;