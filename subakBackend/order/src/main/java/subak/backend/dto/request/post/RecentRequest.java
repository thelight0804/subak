package subak.backend.dto.request.post;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class RecentRequest {
    @ApiModelProperty(value = "가격", required = true, example = "10000")
    private int price;
}