package subak.backend.dto.request.post;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import subak.backend.domain.enumType.Category;

@Data
public class UpdatePostRequest {
    @ApiModelProperty(value = "상품 카테고리", required = true, example = "가전제품")
    private Category category;
    @ApiModelProperty(value = "게시글 제목", required = true, example = "제품 판매합니다")
    private String postTitle;
    @ApiModelProperty(value = "게시글 내용", required = true, example = "ㅈㄱㄴ")
    private String content;
    @ApiModelProperty(value = "상품 가격", required = true, example = "20000")
    private int price;
}