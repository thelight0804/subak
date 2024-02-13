import { View, Modal, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';

import styles from '../../styles/components/modal'
import { shared } from '../../styles/shared';

/**
 * @param {Array} choices 선택 목록
 * @param {Boolean} openModal 모달 오픈 여부
 * @param {Function} setOpenModal 모달 오픈 여부를 설정하는 함수
 * @param {Function} setModalIndex 선택한 목록의 인덱스를 설정하는 함수
 */
const Modal = props => {
  const choices = props.choices;
  return (
    <View style={styles.modalContainer}>
      <Modal
        visible={props.openModal}
        animationType='fade'
        transparent={true}
        onRequestClose={() => props.setOpenModal(false)}>
        <TouchableWithoutFeedback onPress={() => props.setOpenModal(false)}>
          <View style={styles.backDrop} />
        </TouchableWithoutFeedback>

        <View style={styles.modal}>
          {choices.map((choice, index) => {
            return (
              <TouchableOpacity
                style={styles.button}
                key={index}
                onPress={() => {
                  props.setModalIndex(index);
                }}>
                <Text style={shared.text}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={shared.redButton}
            onPress={() => {
              props.setModalIndex(-1);
              props.setOpenModal(false);
            }}>
            <Text style={shared.text}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Modal;