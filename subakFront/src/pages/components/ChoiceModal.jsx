import { View, Modal, TouchableWithoutFeedback, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/components/choiceModal"
import { shared } from "../../styles/shared";

const ChoiceDiaglog = props => {
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

export default ChoiceDiaglog;