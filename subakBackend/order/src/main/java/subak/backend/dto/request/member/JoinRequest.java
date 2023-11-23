package subak.backend.dto.request.member;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class JoinRequest {
    private String email;
    private String name;
    private String password;
    private String phone;
}

