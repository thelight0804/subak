package subak.backend.dto.request.post;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import subak.backend.domain.enumType.ProductStatus;

@Data
public class ProductStatusUpdateRequest {
    @ApiModelProperty(value = "상품 상태", required = true, example = "SALE")
    private ProductStatus productStatus;
}