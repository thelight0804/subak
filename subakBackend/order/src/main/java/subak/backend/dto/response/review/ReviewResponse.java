package subak.backend.dto.response.review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import subak.backend.domain.enumType.ReviewStatus;

@Getter
@AllArgsConstructor
public class ReviewResponse {

    private String postTitle;
    private Long buyerId;
    private Long sellerId;
    private String sellerName;
    private String buyerName;
    private String sellerProfileImage;
    private String buyerProfileImage;
    private String sellerReview;
    private String buyerReview;
    private ReviewStatus reviewStatus;

}