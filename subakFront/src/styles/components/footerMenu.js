import {StyleSheet} from 'react-native';
import { colorPalette } from '../shared';

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
    backgroundColor: colorPalette.background,
  },
  menuContainer: {
    alignItems: 'center',
  }
})

export default styles;