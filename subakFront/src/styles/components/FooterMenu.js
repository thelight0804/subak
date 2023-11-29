import {StyleSheet} from 'react-native';

// color palette
var colorBackground = '#212123';
var text = 'white';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,

    borderTopWidth: 0.5,
    borderTopColor: '#868b94',
  },
  menuBox: {
    alignItems: 'center',
  }
})

export default styles;