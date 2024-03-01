import { StyleSheet } from 'react-native';

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
    borderRadius: 50,
  },
  content: {
    marginTop: 10,
  }
})

export default styles;