package subak.backend.dto.request.review;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
    @ApiModelProperty(value = "리뷰 내용", required = true, example = "상품이 좋았습니다.")
    private String reviewContent;
}
