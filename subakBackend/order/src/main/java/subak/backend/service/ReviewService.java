package subak.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import subak.backend.domain.Member;
import subak.backend.domain.Post;
import subak.backend.domain.Review;
import subak.backend.domain.enumType.ReviewStatus;
import subak.backend.dto.response.review.ReviewResponse;
import subak.backend.exception.MemberException;
import subak.backend.exception.PostException;
import subak.backend.exception.ReviewException;
import subak.backend.repository.MemberRepository;
import subak.backend.repository.PostRepository;
import subak.backend.repository.ReviewRepository;

import javax.persistence.EntityManager;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewService {

    private final EntityManager entityManager;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;


    /**
     * 리뷰 작성
     */
    public ReviewResponse writeReview(Long postId, Long memberId, String reviewContent) {
        Review review = reviewRepository.findByPostId(postId)
                .orElseThrow(() -> new ReviewException.ReviewNotFoundException("Review not found"));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException.MemberNotFoundException("Member not found"));

        if (member.equals(review.getBuyer())) {
            review.setBuyerReview(reviewContent);
            if (review.getSellerReview() != null) {
                review.setReviewStatus(ReviewStatus.BOTH_REVIEWED);
            } else {
                review.setReviewStatus(ReviewStatus.BUYER_REVIEWED);
            }
        }
        else if (member.equals(review.getSeller())) {
            review.setSellerReview(reviewContent);
            if (review.getBuyerReview() != null) {
                review.setReviewStatus(ReviewStatus.BOTH_REVIEWED);
            } else {
                review.setReviewStatus(ReviewStatus.SELLER_REVIEWED);
            }
        } else {
            throw new ReviewException.InvalidReviewAccessException("You are not permitted to write this review");
        }

        review = reviewRepository.save(review);

        ReviewResponse response = new ReviewResponse(
                review.getPost().getPostTitle(),
                review.getSeller().getId(),
                review.getBuyer().getId(),
                review.getSeller().getName(),
                review.getBuyer().getName(),
                review.getSeller().getProfileImage(),
                review.getBuyer().getProfileImage(),
                review.getSellerReview(),
                review.getBuyerReview(),
                review.getReviewStatus()
        );

        return response;
    }


    /**
     * 리뷰 조회
     */
    public ReviewResponse getReview(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostException.PostNotFoundException("Post not found"));

        Review review = post.getReviews().stream()
                .findFirst()
                .orElseThrow(() -> new ReviewException.ReviewNotFoundException("Review not found"));

        Member seller = review.getSeller();
        Member buyer = review.getBuyer();
        String postTitle = review.getPost().getPostTitle();

        Long sellerId = seller.getId();
        Long buyerId = buyer.getId();
        String sellerName = seller.getName();
        String buyerName = buyer.getName();
        String sellerProfileImage = seller.getProfileImage();
        String buyerProfileImage = buyer.getProfileImage();
        String sellerReview = review.getSellerReview() != null ? review.getSellerReview() : "";
        String buyerReview = review.getBuyerReview() != null ? review.getBuyerReview() : "";

        return new ReviewResponse(postTitle, sellerId, buyerId, sellerName, buyerName, sellerProfileImage, buyerProfileImage,
                sellerReview, buyerReview, review.getReviewStatus());
    }


    // 구매자가 리뷰를 작성했는지 확인 (작성했으면 True, 아니면 false)
    public Boolean isReviewWrittenByBuyer(Long postId, Long buyerId) {
        Long count = entityManager.createQuery(
                        "SELECT COUNT(r) FROM Review r WHERE r.post.id = :postId AND r.buyer.id = :buyerId AND r.buyerReview IS NOT NULL", Long.class)
                .setParameter("postId", postId)
                .setParameter("buyerId", buyerId)
                .getSingleResult();
        return count > 0;
    }

    // 판매자가 리뷰를 작성했는지 확인 (작성했으면 True, 아니면 false)
    public Boolean isReviewWrittenBySeller(Long postId, Long sellerId) {
        Long count = entityManager.createQuery(
                        "SELECT COUNT(r) FROM Review r WHERE r.post.id = :postId AND r.seller.id = :sellerId AND r.sellerReview IS NOT NULL", Long.class)
                .setParameter("postId", postId)
                .setParameter("sellerId", sellerId)
                .getSingleResult();
        return count > 0;
    }

    public Review createReview(Post post, Member seller, Member buyer) {
        Review review = new Review(post, seller, buyer);
        review.setReviewStatus(ReviewStatus.PENDING); // 초기 상태 설정
        return reviewRepository.save(review);
    }
}
