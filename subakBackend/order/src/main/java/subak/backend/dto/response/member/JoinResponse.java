package subak.backend.dto.response.member;

import lombok.Data;

@Data
public class JoinResponse {
    private final Long id;

    public JoinResponse(Long id) {
        this.id = id;
    }
}