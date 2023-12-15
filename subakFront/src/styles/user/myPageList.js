import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#37373a',
    paddingBottom: 5,
    marginBottom: 15,
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
  text: {
    textAlign: 'left',
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 12,
  },
  icon: {
    marginRight: 10,
  }
})

export default styles;