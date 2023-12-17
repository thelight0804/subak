package subak.backend.dto.response.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import subak.backend.dto.response.comment.CommentResponse;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostDetailResponse {

    private Long id; // 게시글 ID
    private String postTitle; // 게시글 제목
    private String content; // 게시글 내용
    private List<String> postImages; // 게시글 이미지들
    private int price; // 게시글 가격
    private String postDateTime; // 게시글 작성 시간
    private String address; // 게시글 위치
    private int heartCount; // 좋아요 개수
    private int commentCount; // 댓글 개수

    private String memberName; // 작성자 이름
    private String profileImage; // 작성자 프로필 이미지

    private List<CommentResponse> comments; // 댓글

    public void setPostDateTime(LocalDateTime postDateTime) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(postDateTime, now);
        long seconds = duration.getSeconds();

        if (seconds < 60) {
            this.postDateTime = "방금 전";
        } else if (seconds < 3600) {
            this.postDateTime = seconds / 60 + "분 전";
        } else if (seconds < 86400) {
            this.postDateTime = seconds / 3600 + "시간 전";
        } else {
            this.postDateTime = seconds / 86400 + "일 전";
        }
    }
}
