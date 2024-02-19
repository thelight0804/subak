import { useEffect, useState, useCallback } from 'react';
import {useWindowDimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from "react-redux";
import Config from 'react-native-config';

import { colorPalette } from '../../styles/shared';
import styles from '../../styles/itemHistory/ItemTabs';

import SalesScreen from './SalesScreen';
import CompletedScreen from './CompletedScreen';
import HiddenScreen from './HiddenScreen';
import axios from 'axios';

const renderScene = SceneMap({
  sales: SalesScreen,
  completed: CompletedScreen,
  hidden: HiddenScreen,
});

const ItemTabs = ({navigation}) => {
  const userToken = useSelector(state => state.userData.token); // 유저 데이터
  const [postCounts, setPostCounts] = useState({sales: 0, completed: 0, hidden: 0}); // 판매중, 거래완료, 숨김 게시글 수

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0); // 탭 인덱스
  const [routes, setRoutes] = useState([ // 탭 라우트
    {key: 'sales', title: `판매중`},
    {key: 'completed', title: `거래완료`},
    {key: 'hidden', title: `숨김`},
  ]);

  // postCounts가 변경될 때마다 routes를 업데이트
  useEffect(() => {
    setRoutes([
      {key: 'sales', title: `판매중  ${postCounts.sales}`},
      {key: 'completed', title: `거래완료  ${postCounts.completed}`},
      {key: 'hidden', title: `숨김  ${postCounts.hidden}`},
    ]);
  }, [postCounts]);
  
  useEffect(() => {
    getPostCounts().then((counts) => {
      setPostCounts(counts);
    });
  }, []);

  /**
   * 게시글 수 가져오기
   */
  const getPostCounts = async () => {
    const counts = {sales: 0, completed: 0, hidden: 0};
    // 판매중 게시글 수 가져오기
    axios.get(`http://${Config.DB_IP}/posts/selling/count`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // 토큰 값
        },
        timeout: 2000, // 타임아웃
      })
      .then(response => {
        counts.sales = response.data;
      });
      
    // 거래완료 게시글 수 가져오기
    axios.get(`http://${Config.DB_IP}/posts/completed/count`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // 토큰 값
        },
        timeout: 2000, // 타임아웃
      })
      .then(response => {
        counts.completed = response.data;
      });
      
    // 숨김 게시글 수 가져오기
    axios.get(`http://${Config.DB_IP}/posts/hide/count`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // 토큰 값
        },
        timeout: 2000, // 타임아웃
      })
      .then(response => {
        counts.hidden = response.data;
      });

    return counts;
  };

  return (
    <TabView
      navigationState={{index, routes}} // 탭 인덱스, 라우트
      renderScene={renderScene} // 탭 화면
      onIndexChange={setIndex} // 탭 변경 시 인덱스 변경
      initialLayout={{width: layout.width}} // 탭 너비
      renderTabBar={props => 
        <TabBar 
          {...props}
          style={styles.tabBar} // 탭 바 스타일
          indicatorStyle={{ backgroundColor: 'white' }} // 탭 활성화 시 밑줄 색
          activeColor='white' // 탭 활성화 시 글자 색
          inactiveColor={colorPalette.gray} // 탭 비활성화 시 글자 색
          labelStyle={{fontWeight: 'bold'}} // 탭 글자 굵기
        />
      }
    />
  );
};

export default ItemTabs;