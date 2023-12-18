package subak.backend.dto.response.member;

import lombok.Data;
import subak.backend.domain.Member;

@Data
public class LoginResponse {
    private Long memberId;
    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private String profileImage;
    private float temp;
    private String token;

    public LoginResponse(Long memberId, String name, String phoneNumber, String email, String address, String profileImage, float temp, String token) {
        this.memberId = memberId;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.profileImage = profileImage;
        this.temp = temp;
        this.token = token;
    }

    //정적 팩토리 메서드
    public static LoginResponse from(Member member, String token) {
        return new LoginResponse(
                member.getId(),
                member.getName(),
                member.getPhone(),
                member.getEmail(),
                member.getAddress(),
                member.getProfileImage(),
                member.getTemp(),
                token
        );
    }
}