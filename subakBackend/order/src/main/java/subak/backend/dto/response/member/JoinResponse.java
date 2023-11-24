package subak.backend.dto.response.member;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class JoinResponse {
    private final Long id;
    private HttpStatus httpStatus;

    public JoinResponse(Long id, HttpStatus httpStatus) {
        this.id = id;
        this.httpStatus = httpStatus;
    }
}