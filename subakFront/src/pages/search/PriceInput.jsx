import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import { shared } from "../../styles/shared";
import styles from '../../styles/search/priceInput';
import CommaPrice from "../components/CommaPrice";

const PriceInput = (props) => {
  const [minPrice, setMinPrice] = useState(props.minPrice);
  const [maxPrice, setMaxPrice] = useState(props.maxPrice);

  // 최소 금액 입력
  const handleInputMinChange = (text) => {
    const inputPrice = parseInt(text.replace(/,/g, ''));
    if (!isNaN(inputPrice)) {
      setMinPrice(inputPrice);
    } else {
      setMinPrice(0);
    }
  }

  // 최대 금액 입력
  const handleInputMaxChange = (text) => {
    const inputPrice = parseInt(text.replace(/,/g, ''));
    if (!isNaN(inputPrice)) {
      setMaxPrice(inputPrice);
    } else {
      setMaxPrice(0);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가격</Text>
      <TouchableWithoutFeedback onPress={() => {console.log('백드롭 터치!')}}>
        <View style={styles.backDrop} />
      </TouchableWithoutFeedback>

      <View style={styles.contentContainer}>
        <View style={styles.line} />

        <Text style={[styles.text]}>가격</Text>
        <View style={[shared.inlineContainer, styles.priceInputContainer]}>
          <TextInput
            style={[shared.blankTextInput, styles.priceInput]}
            keyboardType="number-pad"
            onChangeText={handleInputMinChange}
            value={minPrice > 0 && CommaPrice(minPrice)}
            placeholder="최소 금액"
            placeholderTextColor="#676c74"
          />
          <Text style={shared.text}>-</Text>
          <TextInput
            style={[shared.blankTextInput, styles.priceInput]}
            keyboardType="number-pad"
            onChangeText={handleInputMaxChange}
            value={maxPrice > 0 && CommaPrice(maxPrice)}
            placeholder="최대 금액"
            placeholderTextColor="#676c74"
          />
        </View>

        <View style={[shared.inlineContainer, styles.footer]}>
          <TouchableOpacity 
            style={[shared.grayButton, styles.grayButton]}
          >
            <Text style={shared.text}>초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[shared.redButton, styles.redButton]}
          >
            <Text style={shared.text}>적용하기</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default PriceInput;