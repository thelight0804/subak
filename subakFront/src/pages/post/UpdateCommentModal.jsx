import { useState } from 'react';
import { View, Modal, TouchableWithoutFeedback, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

import Alert from '../components/Alert';

import styles from '../../styles/post/updateCommentModal'
import { shared } from '../../styles/shared';

/**
 * @param {String} text 댓글
 * @param {Boolean} openModal 모달 오픈 여부
 * @param {Function} setOpenModal 모달 오픈 여부를 설정하는 함수
 */
const UpdateCommentModal = ({comment, openModal, setOpenModal, postId, token}) => {
  const [content, setContent] = useState(comment.content); // 댓글 내용
  const commentID = comment.id; // 댓글 ID

  const [showAlert, setShowAlert] = useState(false); // 오류 알림창
  const [alertMessage, setAlertMessage] = useState(''); // 오류 메시지

  /**
   * 댓글을 업데이트 하는 함수
   * @param {String} content 댓글
   */
  const updateComment = () => {
    axios.put(`http://${Config.DB_IP}/post/${postId}/comments/${commentID}`,
      {
        content: content,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        timeout: 2000
      }
    )
    .then(response => {
      setOpenModal(false);
    }
    )
    .catch(error => {
      if (error.response) {
        setAlertMessage(
          `데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`,
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('updateComment error.response', error.response.data);
      } else if (error.request) {
        setAlertMessage(
          '서버와의 연결이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.',
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      } else {
        setAlertMessage(
          `데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`,
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
        console.log('updateComment Unexpected error : ', error.message);
      }
    }
    );
  }

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
          <Text style={styles.mainText}>댓글 수정</Text>
          <TextInput
              style={[shared.blankTextInput, styles.textInput]}
              value={content}
              onChangeText={text => setContent(text) }
              inputMode="text"
              textAlignVertical="top" // 커서를 위쪽에 배치
              placeholderTextColor="#676c74"
          />
          <View style={[shared.inlineContainer, {justifyContent: 'flex-end'}]}>
            <TouchableOpacity
              style={[styles.button, shared.grayButton]}
              onPress={() => {
                setOpenModal(false);
              }}>
              <Text style={shared.text}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button, 
                shared.redButton,
                content.length === 0 && {backgroundColor: '#37373a'}
              ]}
              disabled={content.length === 0} // 댓글이 비어있으면 비활성화
              onPress={updateComment}>
              <Text style={[
                shared.text,
                content.length === 0 && {color: '#868b94'}
              ]}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateCommentModal;