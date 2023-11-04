package store.portfolio1.backend.domain.post.dto;

import lombok.Getter;
import lombok.Setter;
import store.portfolio1.backend.common.dto.PageRequestDto;

@Getter
@Setter
public class PostReqDto extends PageRequestDto {
  
  private long pid = 0L;
  private String category = "title";
  private String keyword = "";
  
}
