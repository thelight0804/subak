package subak.backend.dto.response.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class JoinResponse {
    private final Long id;
    private HttpStatus httpStatus;

}