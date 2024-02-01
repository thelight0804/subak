import { useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { shared, colorPalette } from '../../styles/shared';
import styles from '../../styles/itemHistory/ItemTabs';

import SalesScreen from './SalesScreen';
import CompletedScreen from './CompletedScreen';
import HiddenScreen from './HiddenScreen';

const renderScene = SceneMap({
  sales: SalesScreen,
  completed: CompletedScreen,
  hidden: HiddenScreen,
});

const ItemTabs = ({navigation}) => {
  const [postCounts, setPostCounts] = useState({sales: 0, completed: 0, hidden: 0}); // 판매중, 거래완료, 숨김 게시글 수

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0); // 탭 인덱스
  const [routes] = useState([ // 탭 라우트
    {key: 'sales', title: `판매중  ${postCounts.sales}`},
    {key: 'completed', title: `거래완료  ${postCounts.completed}`},
    {key: 'hidden', title: `숨김  ${postCounts.hidden}`},
  ]);

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