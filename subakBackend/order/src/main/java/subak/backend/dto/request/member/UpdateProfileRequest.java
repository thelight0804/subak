package subak.backend.dto.request.member;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateProfileRequest {
    @ApiModelProperty(value = "사용자 이름", required = true, example = "홍길동")
    private String name;
    @ApiModelProperty(value = "프로필 이미지", required = true)
    private MultipartFile profileImage;
}