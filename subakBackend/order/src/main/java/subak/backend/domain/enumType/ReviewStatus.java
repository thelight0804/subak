package subak.backend.domain.enumType;

public enum ReviewStatus {
    PENDING, //아직 양측 모두 후기를 작성하지 않은 상태
    BUYER_REVIEWED, // 구매자만 후기를 작성한 상태
    SELLER_REVIEWED, // 판매자만 후기를 작성한 상태
    BOTH_REVIEWED, // 양측 모두 후기를 작성한 상태
}