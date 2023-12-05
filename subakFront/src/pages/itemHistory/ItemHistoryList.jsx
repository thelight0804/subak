import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/itemHistory/ItemHistoryList';

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