// 팝업 알림
import React, { useEffect, useRef, useState } from 'react';
import {Text, Animated} from 'react-native';

import styles from './../../styles/components/alert';

/**
 * 
 * @param {message} 알림 메시지
 */
const Alert = props => {
  const [message, setMessage] = useState(props.message);

  // 애니메이션
  const scale = useRef(new Animated.Value(0)).current; // 크기 값
  const opacity = useRef(new Animated.Value(1)).current; // 투명도 값
  
  // 커지면서 나타나기
  const scaleIn = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 50, // 애니메이션 속도
      useNativeDriver: true
    }).start(() => {
      // 3.5초 후 사라지기
      setTimeout(() => { 
        scaleOpacityOut();
      }, 3500);
    })
  }

  // 작아지면서 사라지기
  const scaleOpacityOut = () => {
    // 작아지기
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      }),
      // 사라지기
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      })
    ]).start();
    // 두 개 이상의 애니메이션을 적용할 때는 Array.start()를 사용한다.
  }

  // 랜더링 될 때 실행
  useEffect(() => {
    scaleIn();
  })

  // return (
  //   <Animated.View style={{...styles.container, transform: [{ scale: scale }], opacity: opacity}}>
  //     <Text style={styles.Text}>
  //       {message}
  //     </Text>
  //   </Animated.View>
  // );
  return (
    <>
      <Animated.View style={{...styles.container, transform: [{ scale: scale }], opacity: opacity}}>
        <Text style={styles.Text}>
          {message}
        </Text>
      </Animated.View>
    </>
  );
}

export default Alert;