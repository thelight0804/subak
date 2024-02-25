package subak.backend.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import subak.backend.domain.enumType.ReviewStatus;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {

    @Id @GeneratedValue
    @Column(name = "review_id")
    private Long id;

    @JsonManagedReference
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "seller_id")
    private Member seller;

    @JsonManagedReference
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    @JsonManagedReference
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "buyer_review", length = 50)
    private String buyerReview;

    @Column(name = "seller_review", length = 50)
    private String sellerReview;

    @Enumerated(EnumType.STRING)
    private ReviewStatus reviewStatus; //후기 상태 [PENDING, BUYER_REVIEWED, SELLER_REVIEWED, BOTH_REVIEWED]


    public void setReviewStatus(ReviewStatus reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public Review(Post post, Member seller, Member buyer) {
        this.post = post;
        this.seller = seller;
        this.buyer = buyer;
        this.reviewStatus = ReviewStatus.PENDING;
    }
}