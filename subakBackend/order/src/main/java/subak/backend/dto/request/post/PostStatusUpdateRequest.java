package subak.backend.dto.request.post;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import subak.backend.domain.enumType.PostStatus;

@Data
public class PostStatusUpdateRequest {
    @ApiModelProperty(value = "게시글 상태", required = true, example = "BASIC")
    private PostStatus postStatus;
}