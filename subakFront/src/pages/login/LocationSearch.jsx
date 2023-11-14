// 사용자의 위치 선택 페이지
import {useState} from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import shared from '../../styles/shared';
import styles from '../../styles/login/locationSearch'

const LocationSearch = ({ navigation }) => {
  const [location, setLocation] = useState(['부산시', '창원시']); // 사용자의 주위 위치
  const [userLocate, setUserLocate] = useState(''); // 사용자가 입력한 위치

  return (
    <KeyboardAwareScrollView style={shared.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={shared.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicon name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TextInput
            style={[shared.textInput, styles.text]}
            onChangeText={text => setUserLocate(text)}
            value={userLocate}
            inputMode='text'
            placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
            placeholderTextColor="#676c74"
          />
        </View>
        
        <View style={styles.button}>
          <TouchableOpacity 
            style={shared.button}
            onPress={() => console.log(userLocate)}
            // TODO: 현재 위치로 찾기 구현
          >
            <Text style={shared.text}>
              <MaterialIcon name="target" size={20} color="#FFFFFF"/>
              현재위치로 찾기
            </Text>
          </TouchableOpacity>

        </View>
        
        <View style={styles.locationList}>
          <Text style={styles.listText}>근처 동네</Text>
          {location.map((location, i) => 
          <TouchableOpacity key={i} onPress={()=> navigation.navigate('SignUp', {location: location})}>
            <Text style={[styles.listText]}>{location}</Text>
          </TouchableOpacity>
          )}
        </View>
    </KeyboardAwareScrollView>
  );
}

export default LocationSearch;