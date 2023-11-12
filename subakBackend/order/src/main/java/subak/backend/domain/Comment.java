package subak.backend.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter

public class Comment {

    @Id @GeneratedValue
    @Column(name = "cm_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "cm_content")
    private String content;

    @Column(name = "cm_date_time")
    private LocalDateTime cmDateTime; // 댓글 작성 시간

}
