/**
 * 천원 단위로 콤마가 추가된 가격을 반환
 * @param {number} price 가격
 * @returns {string} 콤마가 추가된 가격
 */
const CommaPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default CommaPrice;