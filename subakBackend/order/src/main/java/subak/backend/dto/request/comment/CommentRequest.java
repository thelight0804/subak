package subak.backend.dto.request.comment;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    @ApiParam(value = "댓글 내용", required = true)
    private String content;
}