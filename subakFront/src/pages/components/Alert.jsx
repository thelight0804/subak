// 팝업 알림
import React, { useState } from 'react';
import {View, Text, Modal} from 'react-native';

import shared from '../../styles/shared';
import styles from './../../styles/components/alert';


const Alert = props => {
  const [message, setMessage] = useState(props.message);

  return (
    <View style={styles.container}>
        <Text style={styles.Text}>
          {message}
        </Text>
    </View>
  );
}

export default Alert;