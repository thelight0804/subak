package subak.backend.dto.request.member;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class WithdrawRequest {
    @ApiModelProperty(value = "이메일", required = true)
    private String email;
}
