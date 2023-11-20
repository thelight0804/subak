// 사용자의 위치 선택 페이지
import {useState, useEffect} from 'react';
import { View, TouchableOpacity, TextInput, Text, PermissionsAndroid } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Config from 'react-native-config';

import shared from '../../styles/shared';
import styles from '../../styles/login/locationSearch'

const LocationSearch = ({ navigation }) => {
  const [userAddress, setUserAddress] = useState(''); // 사용자 위치
  const [currentAddress, setCurrentAddress] = useState([]); // 주소 변환

  return (
    <KeyboardAwareScrollView style={shared.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={shared.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TextInput
          style={[shared.textInput, styles.text]}
          onChangeText={text => setUserAddress(text)}
          value={userAddress}
          inputMode="text"
          placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
          placeholderTextColor="#676c74"
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          style={shared.button}
          onPress={() =>
            // 현재 위치 좌표 가져오기
            {
              // 안드로이드 권한 요청
              PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ]);

              // 현재 위치 좌표 가져오기
              Geolocation.getCurrentPosition(
                position => { // 위치 요청 성공 시
                  // 좌표를 주소로 변환
                  axios
                    .get('https://dapi.kakao.com/v2/local/geo/coord2address', {
                      // x: 경도, y: 위도
                      params: {x: position.coords.longitude, y: position.coords.latitude},
                      headers: {Authorization: Config.KAKAO_REST_API_KEY},
                    })
                    .then(response => { // 주소 변환 성공 시
                      // 현재 위치 주소 저장
                      var address = response.data.documents[0].road_address.address_name;
                      var addressArr = [...currentAddress];
                      addressArr.push(address);
                      addressArr = new Set(addressArr); // 중복 제거
                      addressArr = Array.from(addressArr); // Set to Array
                      setCurrentAddress(addressArr);
                    })
                    .catch(error => { console.log(error);});
                },
                error => {
                  // 위치 요청 실패 시
                  console.log('getCurrentPosition ERROR: ', error.code, error.message);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
              );
              // console.log(longitude, latitude)

            }
          }>
          <Text style={shared.text}>
            <MaterialIcon name="target" size={20} color="#FFFFFF" />
            현재위치로 찾기
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationList}>
        <Text style={styles.listText}>근처 동네</Text>
        {currentAddress.map((address, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate('SignUp', {address: address})}>
            <Text style={[styles.listText]}>{address}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default LocationSearch;