package subak.backend.dto.request.post;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UpdatePostRequest {
    @ApiModelProperty(value = "상품 카테고리", example = "가전제품")
    private String category;
    @ApiModelProperty(value = "게시글 제목", example = "제품 판매합니다")
    private String postTitle;
    @ApiModelProperty(value = "상품 가격", example = "20000")
    private int price;
}