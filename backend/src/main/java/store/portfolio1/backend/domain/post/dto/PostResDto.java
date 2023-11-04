package store.portfolio1.backend.domain.post.dto;

import java.util.function.Function;
import org.springframework.data.domain.Page;
import store.portfolio1.backend.common.dto.PageResponseDto;
import store.portfolio1.backend.domain.post.Post;

public class PostResDto extends PageResponseDto<Post, PostGetDto> {

  public PostResDto(Page<Post> result, Function<Post, PostGetDto> fn) {
    super(result, fn);
  }

}
