import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { colorPalette, shared } from "../../styles/shared";
import styles from '../../styles/search/priceInput';
import CommaPrice from "../components/CommaPrice";

const PriceInput = (props) => {
  const [minPrice, setMinPrice] = useState(props.minPrice);
  const [maxPrice, setMaxPrice] = useState(props.maxPrice);
  const [priceRange, setPriceRange] = useState(false); // 가격 범위 오류

  /**
   * 최소 금액 입력
   */
  const handleInputMinChange = (text) => {
    const inputPrice = parseInt(text.replace(/,/g, ''));
    checkPriceRange(inputPrice, maxPrice);

    if (!isNaN(inputPrice)) {
      setMinPrice(inputPrice);
    } else {
      setMinPrice(0);
    }
  }

  /**
   * 최대 금액 입력
   */
  const handleInputMaxChange = (text) => {
    const inputPrice = parseInt(text.replace(/,/g, ''));
    checkPriceRange(minPrice, inputPrice);

    if (!isNaN(inputPrice)) {
      setMaxPrice(inputPrice);
    } else {
      setMaxPrice(0);
    }
  }

  /**
   * 가격 적용 헨들러
   */
  const handleApplyPrice = () => {
    minPrice || maxPrice ? props.setIsPrice(true) : props.setIsPrice(false);
    props.setOpenModal(false);
    props.setMinPrice(minPrice);
    props.setMaxPrice(maxPrice);
  }

  /**
   * 가격 범위 체크
   */
  const checkPriceRange = (minPrice, maxPrice) => {
    if (minPrice > maxPrice && maxPrice !== 0) { // 최소 금액이 최대 금액보다 높을 때
      setPriceRange(true);
    } else { // 최소 금액이 최대 금액보다 낮을 때
      setPriceRange(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가격</Text>
      <TouchableWithoutFeedback onPress={() => props.setOpenModal(false)}>
        <View style={styles.backDrop} />
      </TouchableWithoutFeedback>

      <View style={styles.contentContainer}>
        <View style={styles.line} />

        <Text style={[styles.text]}>가격</Text>
        <View style={[shared.inlineContainer, styles.priceInputContainer]}>
          <TextInput
            style={[
              shared.blankTextInput,
              styles.priceInput,
              priceRange && {borderWidth: 1, borderColor: '#dc645b'},
            ]}
            keyboardType="number-pad"
            onChangeText={handleInputMinChange}
            value={minPrice > 0 && CommaPrice(minPrice)}
            placeholder="최소 금액"
            placeholderTextColor="#676c74"
          />
          <Text style={shared.text}>-</Text>
          <TextInput
            style={[
              shared.blankTextInput,
              styles.priceInput,
              priceRange && {borderWidth: 1, borderColor: '#dc645b'},
            ]}
            keyboardType="number-pad"
            onChangeText={handleInputMaxChange}
            value={maxPrice > 0 && CommaPrice(maxPrice)}
            placeholder="최대 금액"
            placeholderTextColor="#676c74"
          />
        </View>

        <View style={[shared.inlineContainer, styles.priceError]}>
          {priceRange && (
            <>
              <Icon name="alert-circle" size={15} color={colorPalette.error} />
              <Text style={{color: colorPalette.error}}> 최소 금액이 최대 금액보다 높아요</Text>
            </>
          )}
        </View>

        <View style={[shared.inlineContainer, styles.footer]}>
          <TouchableOpacity
            style={[shared.grayButton, styles.grayButton]}
            onPress={() => {
              setMinPrice(0);
              setMaxPrice(0);
              setPriceRange(false);
            }}>
            <Text style={shared.text}>초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              shared.redButton,
              styles.redButton,
              priceRange && styles.disabledButton,
            ]}
            onPress={handleApplyPrice}
            disabled={priceRange}>
            <Text style={[shared.text, priceRange && {color: colorPalette.gray}]}>
              적용하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PriceInput;