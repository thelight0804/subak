package subak.backend.dto.response.comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponse {
    private Long id; // 댓글 ID
    private String memberName; // 유저 이름
    private String content; // 댓글 내용
    private String profileImage; // 댓글 작성자 프로필
    private String cmDateTime; // 댓글 작성 시간


    public CommentResponse(Long id, String memberName, String content, LocalDateTime cmDateTime, String profileImage) {
        this.id = id;
        this.memberName = memberName;
        this.content = content;
        this.setCmDateTime(cmDateTime);
        this.profileImage = profileImage;
    }

    public void setCmDateTime(LocalDateTime cmDateTime) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(cmDateTime, now);
        long seconds = duration.getSeconds();

        if (seconds < 60) {
            this.cmDateTime = "방금 전";
        } else if (seconds < 3600) {
            this.cmDateTime = seconds / 60 + "분 전";
        } else if (seconds < 86400) {
            this.cmDateTime = seconds / 3600 + "시간 전";
        } else {
            this.cmDateTime = seconds / 86400 + "일 전";
        }
    }
}
