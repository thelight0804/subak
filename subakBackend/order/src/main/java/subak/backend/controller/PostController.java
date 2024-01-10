package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.domain.Member;
import subak.backend.dto.request.post.CreatePostRequest;
import subak.backend.dto.request.post.PostStatusUpdateRequest;
import subak.backend.dto.request.post.ProductStatusUpdateRequest;
import subak.backend.dto.request.post.UpdatePostRequest;
import subak.backend.dto.response.post.PostResponse;
import subak.backend.dto.response.post.PostDetailResponse;
import subak.backend.service.AuthService;
import subak.backend.service.CommentService;
import subak.backend.service.PostService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final AuthService authService;
    private final CommentService commentService;

    @ApiOperation(value = "게시글 생성")
    @PostMapping(value = "/post", consumes = {"multipart/form-data"})
    public ResponseEntity<String> createPost(@ModelAttribute @Validated CreatePostRequest createPostRequest,
                                             @RequestPart(value = "postImage", required = false) List<MultipartFile> images,
                                             HttpServletRequest httpServletRequest) throws IOException {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);

        postService.createPost(createPostRequest, loginMember, images);
        return ResponseEntity.ok("Success post");
    }

    @ApiOperation(value = "게시글 수정")
    @PutMapping("/post/{postId}")
    public ResponseEntity<String> updatePost(@PathVariable Long postId,
                                             @ModelAttribute @Validated UpdatePostRequest UpdatePostRequest,
                                             @RequestPart(value = "postImage", required = false) List<MultipartFile> postImages,
                                             HttpServletRequest httpServletRequest) throws IOException {

        authService.getAuthenticatedMember(httpServletRequest);

        postService.updatePost(postId, UpdatePostRequest, postImages);
        return ResponseEntity.ok("Post updated success");
    }

    @ApiOperation(value = "게시글 상태 수정", notes = "필수값 : 게시글 상태")
    @PatchMapping("/post/{postId}/status")
    public ResponseEntity<String> updatePostStatus(@PathVariable Long postId,
                                                   @RequestBody @Validated PostStatusUpdateRequest postStatusUpdateRequest) {
        postService.updatePostStatus(postId, postStatusUpdateRequest.getPostStatus());
        return ResponseEntity.ok("Post status updated success");
    }

    @ApiOperation(value = "상품 상태 수정", notes = "필수값 : 상품 상태")
    @PatchMapping("/post/{postId}/product-status")
    public ResponseEntity<String> updateProductStatus(@PathVariable Long postId,
                                                      @RequestBody @Validated ProductStatusUpdateRequest productStatusUpdateRequest) {
        postService.updateProductStatus(postId, productStatusUpdateRequest.getProductStatus());
        return ResponseEntity.ok("ProductStatus updated success");
    }

    @ApiOperation(value = "게시글 삭제", notes = "필수값 : 게시글 ID")
    @DeleteMapping("/post/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId,
                                             HttpServletRequest httpServletRequest) throws IOException {
        authService.getAuthenticatedMember(httpServletRequest);
        postService.deletePost(postId);
        return ResponseEntity.ok("Success Delete post");
    }

    @ApiOperation(value = "끌어올리기", notes = "필수값 : 게시글 ID, 가격")
    @PutMapping("/post/{postId}/recent")
    public ResponseEntity<String> recentPost(@PathVariable Long postId,
                                             @RequestBody Map<String, Integer> body,
                                             HttpServletRequest httpServletRequest) {
        int price = body.get("price");
        authService.getAuthenticatedMember(httpServletRequest);
        postService.recentPost(postId, price);
        return ResponseEntity.ok("Post updated to recent success");
    }

    @ApiOperation(value = "좋아요 추가 또는 취소", notes = "필수값 : 게시글 ID")
    @PostMapping("/post/{postId}/hearts")
    public ResponseEntity<Void> addOrRemoveHeart(@PathVariable Long postId, HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        postService.addOrRemoveHeart(postId, loginMember);
        return ResponseEntity.ok().build();
    }


    @ApiOperation(value = "메인페이지 게시글 목록 출력")
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponse>> getMainPosts(
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        return ResponseEntity.ok(postService.getMainPosts(offset, limit));
    }

    @ApiOperation(value = "게시글 상세페이지 출력")
    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostDetailResponse> getPostDetail(@PathVariable("postId") Long id,
                                                            HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        return ResponseEntity.ok(postService.getPostDetail(id, loginMember));
    }

    @ApiOperation(value = "관심 상품 조회")
    @GetMapping("/posts/likedBy")
    public ResponseEntity<List<PostResponse>> getLikedPosts(
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        return ResponseEntity.ok(postService.getLikedPosts(offset, limit, loginMember.getId()));
    }

    @ApiOperation(value = "판매 완료된 상품 조회")
    @GetMapping("/posts/completed")
    public ResponseEntity<List<PostResponse>> getCompletePosts(
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        return ResponseEntity.ok(postService.getCompletePosts(offset, limit, loginMember.getId()));
    }

    @ApiOperation(value = "숨김 게시물 조회")
    @GetMapping("/posts/hide")
    public ResponseEntity<List<PostResponse>> getHidePosts(
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        return ResponseEntity.ok(postService.getHidePosts(offset, limit, loginMember.getId()));
    }

}