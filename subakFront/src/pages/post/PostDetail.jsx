import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

import { shared } from '../../styles/shared';
import styles from '../../styles/post/postDetail';

import Loading from '../components/Loading';
import CommaPrice from '../components/CommaPrice'

const PostDetail = ({navigation, route}) => {
  const [post, setPost] = useState(null); // 게시물 상세 데이터
  const [tempColor, setTempColor] = useState('white'); // 매너 온도 색상
  const [tempEmoji, setTempEmoji] = useState('❔'); // 매너 온도 이모지

  // 게시물 상세 데이터 가져오기
  useEffect(() => {
    axios.get(`http://${Config.DB_IP}/posts/${route.params.postId}`, {timeout: 2000})
      .then(response => {
        if (response.status === 200) {
          setPost(response.data);
        }
      })
      .catch(error => { 
        if (error.response) { // 요청은 성공했으나 응답은 실패
          setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostsList error.response', error.response);
        } else if (error.request) { // timeout으로 요청 실패
          setAlertMessage('서버와의 연결이 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        } else { // 기타 오류 발생
          setAlertMessage(`데이터를 불러오는데 에러가 발생했습니다. \n[${error.message}]`);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
          console.log('PostsList Unexpected error', error.message);
        }});
  }, []);

  // 매너온도에 따른 색상, 이모지 변경
  useEffect(() => {
    if (post) {
      if (post.temp <= 12.5) {
        setTempColor('#868b94');
        setTempEmoji('😠');
      } else if (post.temp <= 30) {
        setTempColor('#0277b2');
        setTempEmoji('🙁');
      } else if (post.temp <= 36.5){
        setTempColor('#019ceb');
        setTempEmoji('🙂');
      } else if (post.temp <= 50.5){
        setTempColor('#2fc795');
        setTempEmoji('😀');
      } else if (post.temp <= 65.5){
        setTempColor('#f7be68');
        setTempEmoji('😄');
      } else { // 최고 온도
        setTempColor('#ff6e1d');
        setTempEmoji('😆');
      }
    }
  }, [post])
  
  return (
    <View style={shared.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={shared.iconButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={shared.iconButton}
          onPress={() => navigation.navigate('PostsList')}>
          <Icon name="home-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {post ? <RenderContent post={post} tempColor={tempColor} tempEmoji={tempEmoji}/> : <Loading />}
      </ScrollView>

      <View style={styles.footer}>
        {post && <RenderFooter price={post.price}/>}
      </View>
  </View>
  );
};

const RenderContent = ({post, tempColor, tempEmoji}) => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image style={styles.mainImage} source={{uri: post.postImages[0]}} />
      </View>

      <View style={styles.titleContainer}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{uri: post.profileImage}} />
          <View style={styles.profileNameContainer}>
            <Text style={styles.text}>{post.memberName}</Text>
            <Text style={styles.textGray}>{post.address}</Text>
          </View>
        </View>
        <View style={styles.tempContainger}>
          <View style={styles.tempContainer}>
            <View>
              <Text style={[
                  styles.temp,
                  {color: tempColor},
                ]}> {`${post.temp}℃`}
              </Text>
              <View>
                <View style={styles.tempBar} />
                <View style={[
                    styles.tempBar,
                    styles.tempColorBar,
                    {backgroundColor: tempColor},
                    {width: (post.temp * 40) / 100}
                  ]} />
              </View>
            </View>
            <Text style={styles.tempEmoji}>{tempEmoji}</Text>
          </View>
          <Text style={styles.tempText}>매너온도</Text>
        </View>
      </View>

      <View style={styles.postContent}>
        <Text style={[styles.text, styles.postTitle]}>{post.postTitle}</Text>
        <Text style={[styles.textGray, styles.postDateTime]}>{post.postDateTime}</Text>
        <Text style={[styles.text, styles.content]}>{post.content}</Text>
      </View>
    </>
  );
}

const RenderFooter = ({price}) => {
  return(
    <>
    <View style={styles.heartContainer}>
      <TouchableOpacity style={styles.heart}>
        <Icon name="heart-outline" color="#868b94" size={25}/>
      </TouchableOpacity>
      <Text style={styles.price}>{`${CommaPrice(price)}원`}</Text>
    </View>
    <TouchableOpacity style={shared.button}>
      <Text style={[styles.buttonText, shared.redButton]}>구매하기</Text>
    </TouchableOpacity>
  </>
  );
};

export default PostDetail;