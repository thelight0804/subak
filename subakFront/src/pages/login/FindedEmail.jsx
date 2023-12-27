import { View, TouchableOpacity, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from '../../styles/shared';
import styles from '../../styles/login/findedEmail';

const FindedEmail = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={shared.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            style={[shared.iconButton, styles.backButton]}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>{route.params.name}님의 이메일은</Text>
        <Text style={[styles.headerText, styles.email]}>{route.params.email}
          <Text style={styles.headerText}>입니다.</Text>
        </Text>
      <TouchableOpacity
        style={shared.redButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={shared.text}>로그인 하기</Text>
      </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FindedEmail;