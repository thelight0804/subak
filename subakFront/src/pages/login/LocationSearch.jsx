// 사용자의 위치 선택 페이지
import {useState} from 'react';
import { View, TouchableOpacity, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


import shared from '../../styles/shared';
import styles from '../../styles/locationSearch'

const LocationSearch = ({ navigation }) => {
  const [location, setLocation] = useState(['근처 동네', '부산시', '창원시']); // 사용자의 주위 위치
  const [userLocate, setUserLocate] = useState(''); // 사용자가 입력한 위치

  return (
    <KeyboardAvoidingView
      style={shared.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicon name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={text => setUserLocate(text)}
            value={userLocate}
            inputMode='text'
            placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
            placeholderTextColor="#676c74"
          />
        </View>
        
        <View style={styles.button}>
          <TouchableOpacity onPress={() => console.log("현재위치로 찾기 버튼 클릭")} >
            <Text style={[shared.button, shared.text]}>
              <MaterialIcon name="target" size={25} color="#FFFFFF" />
              현재 위치로 찾기
            </Text>
          </TouchableOpacity>

        </View>
        
        <View style={styles.locationList}>
          {location.map((location, i) => 
            <Text key={i} style={styles.text}>{location}</Text>
          )}
        </View>
    </KeyboardAvoidingView>
  );
}

export default LocationSearch;