package subak.backend.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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

}
