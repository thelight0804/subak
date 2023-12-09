package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.domain.Member;
import subak.backend.domain.Post;
import subak.backend.dto.request.post.CreatePostRequest;
import subak.backend.dto.request.post.PostStatusUpdateRequest;
import subak.backend.dto.request.post.ProductStatusUpdateRequest;
import subak.backend.dto.request.post.UpdatePostRequest;
import subak.backend.service.AuthService;
import subak.backend.service.PostService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final AuthService authService;

    @ApiOperation(value = "게시글 생성", notes = "필수값 : 제목, 카테고리, 가격")
    @PostMapping(value = "/post", consumes = {"multipart/form-data"})
    public ResponseEntity<String> createPost(@ModelAttribute @Validated CreatePostRequest createPostRequest,
                                             @RequestPart("postImage") List<MultipartFile> images,
                                             HttpServletRequest httpServletRequest) throws IOException {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);

        postService.createPost(createPostRequest, loginMember, images);
        return ResponseEntity.ok("Success post");
    }

    @ApiOperation(value = "게시글 수정", notes = "필수값 : 제목, 카테고리, 가격, 제품 사진")
    @PutMapping("/post/{postId}")
    public ResponseEntity<String> updatePost(@PathVariable Long postId,
                                             @ModelAttribute @Validated UpdatePostRequest UpdatePostRequest,
                                             @RequestPart("postImage") List<MultipartFile> postImages,
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

    @ApiOperation(value = "끌어올리기", notes = "필수값 : 게시글 ID")
    @PutMapping("/post/{postId}/recent")
    public ResponseEntity<String> recentPost(@PathVariable Long postId, HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        postService.recentPost(postId);
        return ResponseEntity.ok("Post updated to recent success");
    }

    @ApiOperation(value = "좋아요 추가", notes = "필수값 : 게시글 ID")
    @PostMapping("/post/{postId}/hearts/")
    public ResponseEntity<Void> addHeart(@PathVariable Long postId, HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        postService.addHeart(postId, loginMember);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "좋아요 삭제", notes = "필수값 : 게시글 ID")
    @DeleteMapping("/post/{postId}/hearts/")
    public ResponseEntity<Void> removeHeart(@PathVariable Long postId, HttpServletRequest httpServletRequest) {
        Member loginMember = authService.getAuthenticatedMember(httpServletRequest);
        postService.removeHeart(postId, loginMember);
        return ResponseEntity.ok().build();
    }



    @GetMapping("/posts")
    public List<Post> getPosts() {
        return postService.getPosts();
    }

    @GetMapping("/posts/{postId}")
    public Post getPostDetail(@PathVariable Long id) {
        return postService.getPostDetail(id);
    }
}