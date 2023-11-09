// 시작 화면
import { react, useState } from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';

import shared from '../../styles/shared';
import styles from '../../styles/start';
import SelectContryModal from '../../components/SelectCountryModal';
import FindLocate from './FindLocate';
import Login from './Login';

const Index = () => {
  // 국가 선택 버튼
  const [country, setCountry] = useState(["🇰🇷 대한민국", "🇯🇵 일본"]);
  const [countryIndex, setCountryIndex] = useState(0); // 선택된 국가 인덱스
  const [openModal, setOpenModal] = useState(false); // 국가 선택 모달 상태
  
  return (
    <View style={styles.container}>
      {openModal && <SelectContryModal country={country} countryIndex={countryIndex} setCountryIndex={setCountryIndex} openModal={openModal} setOpenModal={setOpenModal}/>}
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../../assets/image/launch_screen.png')}
        />
        <View>
          <Text style={[styles.text, styles.title]}>당신 근처의 수박</Text>
          <Text style={styles.text}>동네라서 가능한 모든 것</Text>
          <Text style={styles.text}>지금 내 동네를 선택하고 시작해보세요!</Text>
          <TouchableOpacity>
            <Text
              onPress={() => setOpenModal(true)}
              style={[styles.countryButton, styles.text, styles.countryText]}>
              {country[countryIndex] + ' ﹀'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => console.log("onPress")}
          >
            <Text style={[shared.button, styles.text, styles.startText]}>시작하기</Text>
          </TouchableOpacity>
          <Text style={[styles.text, styles.text2]}>
            이미 계정이 있나요?
            <Text
              style={[styles.text, styles.hyperlink]}
              onPress={() => console.log("onPress")}> 로그인</Text>
          </Text>
      </View>

      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="FindLocate" component={FindLocate} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </View>
  );
};



export default Index;
