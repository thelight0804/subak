package subak.backend.dto.request.post;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.domain.enumType.Category;

import java.util.List;

@Data
public class CreatePostRequest {
    @ApiModelProperty(value = "게시글 제목", required = true, example = "")
    private String postTitle;
    @ApiModelProperty(value = "게시글 내용", required = true, example = "판매합니다.")
    private String content;
    @ApiModelProperty(value = "상품 가격", required = true, example = "10000")
    private String price;
    @ApiModelProperty(value = "상품 카테고리", required = true, example = "전자제품")
    private Category category;
    @ApiModelProperty(value = "게시글 이미지")
    private List<MultipartFile> postImage;

    public int getPrice() {
        return Integer.parseInt(price);
    }
}