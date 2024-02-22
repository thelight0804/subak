import {StyleSheet} from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  header: {
    color: colorPalette.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  grayText: {
    color: colorPalette.gray,
    marginTop: 10,
    marginBottom: 10,
  },
  reviewContainer: { // 리뷰 컨테이너
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    
    backgroundColor: '#ffe0a1',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
  contentContainer: {
    backgroundColor: '#ffecc8',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contentText: {
    color: 'black',
    padding: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default styles;