// 로그인이 되어 있지 않을 때 시작 화면
import { react, useState } from 'react';
import {Image, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import WheelPicker from 'react-native-wheely';

import shared from '../../styles/shared';
import styles from '../../styles/login/start';

const Start = ({navigation}) => {
  // 국가 선택 버튼
  const [country, setCountry] = useState(["🇰🇷 대한민국", "🇯🇵 일본"]);
  const [countryIndex, setCountryIndex] = useState(0); // 선택된 국가 인덱스
  const [openModal, setOpenModal] = useState(false); // 국가 선택 모달 상태
  
  return (
    <View style={shared.container}>
      {openModal && (
        <SelectContryModal
          country={country}
          countryIndex={countryIndex}
          setCountryIndex={setCountryIndex}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
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
          style={shared.button}
          onPress={() => navigation.navigate('AddressSearch')}>
          <Text style={[styles.text, styles.startText]}>시작하기</Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.text2]}>
          이미 계정이 있나요?
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.text, styles.hyperlink]}>
              로그인
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

/**
 * 국가 선택 모달창
 * @param {countryIndex}
 * @returns 
 */
const SelectContryModal = props => {
  var [index, setIndex] = useState(props.countryIndex);

  return (
    <View style={styles.modalContainer}>
      <Modal
        visible={props.openModal}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => props.setOpenModal(false)}>
        <TouchableWithoutFeedback onPress={() => props.setOpenModal(false)}>
          <View style={styles.backDrop} />
        </TouchableWithoutFeedback>

        <View style={styles.modal}>
          <Text style={styles.modalText}>국가를 선택해주세요</Text>
          <WheelPicker
            selectedIndex={props.countryIndex}
            options={props.country}
            onChange={i => setIndex(i)}
            itemStyle={styles.select}
            itemTextStyle={styles.itemText}
          />
          <TouchableOpacity
            style={shared.button}
            onPress={() => {
              props.setCountryIndex(index);
              props.setOpenModal(false);
            }}>
            <Text style={styles.text}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};



export default Start;
