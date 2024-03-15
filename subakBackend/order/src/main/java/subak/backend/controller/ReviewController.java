package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import subak.backend.domain.Member;
import subak.backend.domain.Review;
import subak.backend.dto.request.review.ReviewRequest;
import subak.backend.dto.response.review.ReviewResponse;
import subak.backend.service.AuthService;
import subak.backend.service.PostService;
import subak.backend.service.ReviewService;

import javax.servlet.http.HttpServletRequest;
@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final AuthService authService;
    private final ReviewService reviewService;

    @ApiOperation(value = "리뷰 작성")
    @PostMapping("/review/{postId}")
    public ResponseEntity<ReviewResponse> writeReview(
            @PathVariable Long postId,
            @RequestBody ReviewRequest request,
            HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        ReviewResponse reviewResponse = reviewService.writeReview(postId, loginMember.getId(), request.getReviewContent());
        return ResponseEntity.ok(reviewResponse);
    }

    @ApiOperation(value = "리뷰 조회")
    @GetMapping("/review/{postId}")
    public ResponseEntity<ReviewResponse> getReview(@PathVariable Long postId) {
        ReviewResponse response = reviewService.getReview(postId);
        return ResponseEntity.ok(response);
    }

    @ApiOperation(value = "구매자의 리뷰 작성 여부 확인")
    @GetMapping("/reviews/{postId}/buyer-status")
    public ResponseEntity<Boolean> isReviewWrittenByBuyer(
            @PathVariable Long postId,
            HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        return ResponseEntity.ok(reviewService.isReviewWrittenByBuyer(postId, loginMember.getId()));
    }

    @ApiOperation(value = "판매자의 리뷰 작성 여부 확인")
    @GetMapping("/reviews/{postId}/seller-status")
    public ResponseEntity<Boolean> isReviewWrittenBySeller(
            @PathVariable Long postId,
            HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        return ResponseEntity.ok(reviewService.isReviewWrittenBySeller(postId, loginMember.getId()));
    }


}
