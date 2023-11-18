package subak.backend.dto.request.member;

import lombok.Data;

@Data
public class JoinRequest {
    private String email;
    private String name;
    private String password;
    private String phone;
}

