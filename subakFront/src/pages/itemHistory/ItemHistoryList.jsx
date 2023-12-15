import { View, Text } from 'react-native';

import { shared } from '../../styles/shared';
import styles from '../../styles/itemHistory/itemHistoryList';

const ItemHistoryList = ({navigation}) => {
  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.content}>
          <Text style={shared.text}>ItemHistoryList</Text>
        </View>
      </View>
    </>
  )
};

export default ItemHistoryList;