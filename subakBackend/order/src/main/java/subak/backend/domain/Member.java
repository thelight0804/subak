package subak.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import subak.backend.domain.enumType.MemberStatus;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@JsonIdentityInfo( // Post엔티티
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
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

    @Column(name = "member_address")
    private String address;

    @Column(name = "member_status")
    @Enumerated(EnumType.STRING)
    private MemberStatus status = MemberStatus.ACTIVE; // 멤버상태 [활동중]

    @JsonManagedReference
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "member")
    private List<Heart> hearts = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    public void updateProfileImage(String newImageUrl) {
        this.profileImage = newImageUrl;
    }

    public void increaseTemp(float increment) {
        this.temp += increment;
    }
}