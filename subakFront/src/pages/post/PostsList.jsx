import {useState, useEffect} from 'react';
import { View, Text } from 'react-native';

import shared from '../../styles/shared';
import styles from '../../styles/post/postsList';
import Alert from '../components/Alert';

const PostsList = ({navigation}) => {
  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  useEffect(() => {
      setAlertMessage(`공유 기능은 준비 중입니다.`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
  }, [])

  return (
    <>
      <View style={shared.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.content}>
          <Text style={shared.text}>PostsList</Text>
        </View>
      </View>
    </>
  )
};

export default PostsList;