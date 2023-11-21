package subak.backend.dto.request.member;

import lombok.Data;

@Data
public class FindMemberEmailRequest {
    private String name;
    private String phone;
}
