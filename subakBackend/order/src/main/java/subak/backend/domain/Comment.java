package subak.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {

    @Id @GeneratedValue
    @Column(name = "cm_id")
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonBackReference
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "cm_content")
    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @Column(name = "cm_date_time")
    private LocalDateTime cmDateTime; // 댓글 작성 시간


    public static Comment createComment(Post post, Member member, String content) {
        Comment comment = new Comment();
        comment.setPost(post);
        comment.setMember(member);
        comment.setContent(content);
        comment.setCmDateTime(LocalDateTime.now());
        return comment;
    }
}