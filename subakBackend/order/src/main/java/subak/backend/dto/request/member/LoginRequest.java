package subak.backend.dto.request.member;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;

@Data
public class LoginRequest {
    @ApiParam(value = "사용자 아이디(이메일)", required = true, example = "_@_.com")
    private String email;
    @ApiModelProperty(value = "사용자 비밀번호", required = true, example = "")
    private String password;
}