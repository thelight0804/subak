package subak.backend.dto.response.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponse {
    private Long id; // 댓글 ID
    private String memberName; // 유저 이름
    private String content; // 댓글 내용
    private String profileImage; // 댓글 작성자 프로필

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime cmDateTime; // 댓글 작성 시간

    public CommentResponse() {
    }

    public CommentResponse(Long id, String memberName, String content, LocalDateTime cmDateTime, String profileImage) {
        this.id = id;
        this.memberName = memberName;
        this.content = content;
        this.cmDateTime = cmDateTime;
        this.profileImage = profileImage;
    }
}
