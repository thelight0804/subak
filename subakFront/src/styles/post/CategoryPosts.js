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

  // 관심목록이 비어있는 경우
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalette.background,
  },
  noPostsText: {
    color: colorPalette.gray,
    textAlign: 'center',
    fontWeight: 'bold',

    marginTop: 10,
  },
})

export default styles;