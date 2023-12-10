package subak.backend.domain;

import lombok.Getter;
import lombok.Setter;
import subak.backend.domain.enumType.MemberStatus;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column(name = "member_email", unique = true)
    private String email;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_pw")
    private String password;

    @Column(name = "member_phone")
    private String phone;

    @Column(name = "member_temp")
    private float temp = 36.5F; // 매너온도

    @Column(name = "member_profileImage")
    private String profileImage; //프로필 사진

    @Column(name = "member_status")
    @Enumerated(EnumType.STRING)
    private MemberStatus status = MemberStatus.ACTIVE; // 멤버상태 [활동중]

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    public void updateProfileImage(String newImageUrl) {
        this.profileImage = newImageUrl;
    }

}