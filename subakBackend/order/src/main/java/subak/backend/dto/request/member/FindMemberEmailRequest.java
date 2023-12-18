package subak.backend.dto.request.member;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class FindMemberEmailRequest {
    @ApiModelProperty(value = "사용자 이름", required = true, example = "홍길동")
    private String name;
    @ApiModelProperty(value = "사용자 휴대폰 번호", required = true, example = "01012345678")
    private String phone;
}