package subak.backend.dto.response.member;

import lombok.Data;
import subak.backend.domain.Member;

@Data
public class GetCommenterMemberResponse {

    private Long id;
    private String name;
    private float temp;
    private String profileImage;

    public GetCommenterMemberResponse(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.temp = member.getTemp();
        this.profileImage = member.getProfileImage();
    }

}
