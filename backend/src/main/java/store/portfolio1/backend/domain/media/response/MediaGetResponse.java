package store.portfolio1.backend.domain.media.response;

import java.util.function.Function;
import org.springframework.data.domain.Page;
import store.portfolio1.backend.common.response.PageResponse;
import store.portfolio1.backend.domain.media.Media;

public class MediaGetResponse extends PageResponse<Media, MediaGetResponse>{

  public MediaGetResponse(Page<Media> page, Function<Media, MediaGetResponse> fn) {
    super(page, fn);
  }
  
}
