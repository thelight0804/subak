package subak.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import subak.backend.config.JwtTokenProvider;
import subak.backend.domain.Comment;
import subak.backend.domain.Member;
import subak.backend.domain.Post;
import subak.backend.domain.enumType.MemberStatus;
import subak.backend.dto.request.comment.CommentRequest;
import subak.backend.exception.CommentException;
import subak.backend.repository.CommentRepository;

import javax.servlet.http.HttpServletRequest;


@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final AuthService authService;


    // 댓글 생성
    public Comment createComment(Post post, CommentRequest request, HttpServletRequest httpServletRequest) {
        Member member = authService.getAuthenticatedMember(httpServletRequest);
        Comment comment = Comment.createComment(post, member, request.getContent());
        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Long id, CommentRequest request, HttpServletRequest httpServletRequest) {
        Comment comment = getComment(id);
        Member member = authService.getAuthenticatedMember(httpServletRequest);

        if (!comment.getMember().equals(member)) {
            throw new CommentException.UnauthorizedCommentUpdateException("댓글 작성자만 댓글을 수정할 수 있습니다.");
        }

        comment.setContent(request.getContent());
        return commentRepository.save(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long id, HttpServletRequest httpServletRequest) {
        Comment comment = getComment(id);
        Member member = authService.getAuthenticatedMember(httpServletRequest);

        if (!comment.getMember().equals(member) && !comment.getPost().getMember().equals(member)) {
            throw new CommentException.UnauthorizedCommentDeletionException("댓글 작성자 또는 게시글 작성자만 댓글을 삭제할 수 있습니다.");
        }

        commentRepository.deleteById(id);
    }

    // 댓글 조회
    public Comment getComment(Long id) {
        return commentRepository.findById(id).orElseThrow(() ->
                new CommentException.CommentNotFoundException("해당 댓글이 존재하지 않습니다."));
    }


    // 멤버가 삭제된 경우 댓글 표시
    public String deleteMemberComment(Comment comment) {
        Member author = comment.getMember();
        if (author.getStatus() == MemberStatus.DELETE) {
            return "삭제된 사용자입니다.";
        } else {
            return author.getName();
        }
    }
}