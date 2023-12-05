import { View, Text } from 'react-native';

import shared from '../../styles/Shared';
import styles from '../../styles/itemHistory/ItemHistoryList';

import FooterMenu from '../components/FooterMenu';

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
      <View style={styles.footer}>
        <FooterMenu selectedIndex={2} navigation={navigation}/>
      </View>
    </>
  )
};

export default ItemHistoryList;