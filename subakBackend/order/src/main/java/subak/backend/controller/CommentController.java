package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import subak.backend.domain.Comment;
import subak.backend.domain.Post;
import subak.backend.dto.request.comment.CommentRequest;
import subak.backend.service.CommentService;
import subak.backend.service.PostService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class CommentController {


    private final CommentService commentService;
    private final PostService postService;

    @ApiOperation(value = "댓글 작성", notes = "특정 게시글에 댓글을 작성한다.")
    @PostMapping("/post/{postId}/comments")
    public ResponseEntity<Comment> createComment(@PathVariable Long postId,
                                                 @RequestBody CommentRequest request,
                                                 HttpServletRequest httpServletRequest) {
        Post post = postService.getPostById(postId);
        Comment comment = commentService.createComment(post, request, httpServletRequest);
        return ResponseEntity.ok(comment);
    }

    @ApiOperation(value = "댓글 수정", notes = "특정 게시글의 댓글을 수정한다.")
    @PutMapping("/post/{postId}/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long postId,
                                                 @PathVariable Long commentId,
                                                 @RequestBody CommentRequest request,
                                                 HttpServletRequest httpServletRequest) {
        Comment comment = commentService.updateComment(commentId, request, httpServletRequest);
        return ResponseEntity.ok(comment);
    }

    @ApiOperation(value = "댓글 삭제", notes = "특정 게시글의 댓글을 삭제한다.")
    @DeleteMapping("/post/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long postId,
                                              @PathVariable Long commentId,
                                              HttpServletRequest httpServletRequest) {
        commentService.deleteComment(commentId, httpServletRequest);
        return ResponseEntity.noContent().build();
    }

    // 댓글 조회
    @GetMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity<Comment> getComment(@PathVariable Long postId,
                                              @PathVariable Long commentId) {
        Comment comment = commentService.getComment(commentId);
        return ResponseEntity.ok(comment);
    }
}