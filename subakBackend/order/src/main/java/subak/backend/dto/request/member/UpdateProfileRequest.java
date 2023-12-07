package subak.backend.dto.request.member;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateProfileRequest {
    @ApiModelProperty(value = "프로필 이미지")
    private MultipartFile profileImage;
}