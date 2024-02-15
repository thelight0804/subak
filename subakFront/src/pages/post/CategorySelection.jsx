import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { shared } from "../../styles/shared"
import styles from "../../styles/post/CategorySelection"
import categoriesImages from "../../assets/image/categories/categoriesIndex";

const CategorySelection = ({navigation}) => {
  const categories = ['디지털/가전', '가구/인테리어', '의류', '도서/티켓\n음반/게임', '뷰티/미용', '기타'];
  const categoriesEng = ['ELECTRONICS', 'FURNITURE', 'CLOTHING', 'BOOKS_TICKETS_RECORDS_GAMES', 'BEAUTY', 'ETC']

  return (
    <View style={shared.container}>
      <View style={styles.inlineContainer}>
        <TouchableOpacity
          style={shared.iconButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[shared.text, styles.mainText]}>카테고리</Text>
        <View style={shared.iconButton}></View>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              navigation.navigate('HomeStack', {
                screen: 'CategorySelection',
                params: {category: categoriesEng[index]},
              })
            }>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={categoriesImages[index]} />
            </View>
            <Text style={shared.text}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategorySelection;