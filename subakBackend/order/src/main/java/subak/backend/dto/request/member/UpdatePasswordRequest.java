package subak.backend.dto.request.member;

import lombok.Data;

@Data
public class UpdatePasswordRequest {
    private String email;
    private String name;
    private String phone;
    private String newPassword;
}