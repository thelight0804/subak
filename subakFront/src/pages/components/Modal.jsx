import { View, Modal, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';

import styles from '../../styles/components/modal'
import { shared } from '../../styles/shared';

/**
 * @param {String} text 텍스트
 * @param {Boolean} openModal 모달 오픈 여부
 * @param {Function} setOpenModal 모달 오픈 여부를 설정하는 함수
 */
const Modal = ({text, openModal, setOpenModal}) => {
  const oldText = text; // 이전 텍스트
  const newText = text; // 새로운 텍스트
  return (
    <View style={styles.modalContainer}>
      <Modal
        visible={openModal}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setOpenModal(false)}>
        <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
          <View style={styles.backDrop} />
        </TouchableWithoutFeedback>

        <View style={styles.modal}>
          <Text>아아ㅏㅏㅏㅏ아</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Modal;