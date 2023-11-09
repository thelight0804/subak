package subak.backend.domain;

import lombok.Getter;
import lombok.Setter;

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
    private double temp; // 매너온도

    @Column(name = "member_picture")
    private String picture; //프로필 사진

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    //인증타입

}