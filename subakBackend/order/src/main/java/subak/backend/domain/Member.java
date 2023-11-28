package subak.backend.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.domain.enumType.MemberStatus;
import subak.backend.exception.MemberException;

import javax.persistence.*;
import java.io.IOException;
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
    private float temp; // 매너온도

    @Lob
    @Column(name = "member_picture")
    private byte[] picture; //프로필 사진

    @Column(name = "member_status")
    @Enumerated(EnumType.STRING)
    private MemberStatus status = MemberStatus.ACTIVE; // 멤버상태 [활동중]

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    //
    public void setProfileImage(MultipartFile file) {
        try {
            this.picture = file.getBytes();
        } catch (IOException e) {
            throw new MemberException.FileUploadException("업로드 실패", e);
        }
    }

}