import {StyleSheet} from 'react-native';

// color palette
var colorBackground = '#212123';
var text = 'white';
var colorMain = '#dc645b';
var colorError = '#DC3F3E';

const styles = StyleSheet.create({
  container: {
    position: 'relative',

    // flex
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // 여백
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,

    // 테두리
    borderTopWidth: 0.5,
    borderTopColor: '#868b94',
    backgroundColor: colorBackground,
  },
  menuBox: {
    alignItems: 'center',
  }
})

export default styles;