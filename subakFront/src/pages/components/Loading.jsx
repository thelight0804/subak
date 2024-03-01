import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colorPalette } from '../../styles/shared';

const Loading = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#dc645b" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colorPalette.background,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default Loading;