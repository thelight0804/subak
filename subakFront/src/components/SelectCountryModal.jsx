// 국가 선택 모달창
import {react, useState} from 'react';
import {Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import WheelPicker from 'react-native-wheely';

import shared from '../styles/shared';
import styles from '../styles/start';

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
            onPress={() => {
              props.setCountryIndex(index);
              props.setOpenModal(false);
            }}>
            <Text style={[shared.button, styles.text]}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SelectContryModal;
