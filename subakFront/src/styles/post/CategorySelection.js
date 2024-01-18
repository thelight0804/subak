import { StyleSheet } from 'react-native';
import { colorPalette } from '../shared';

const styles = StyleSheet.create({
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainText: {
    fontSize: 16,
    paddingBottom: 8,
  },

  // 카테고리 선택 버튼
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '30%', 
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginBottom: 15,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },

  // 카테고리 선택 버튼
  imageContainer: {
    padding: 10,
    marginBottom: 10,

    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#2b2e33',
  },
  image: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  }
});

export default styles;