package store.portfolio1.backend.common.request;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import lombok.Setter;

@Setter
public class PageRequest {

  private int page = 1;
  private int size = 20;
 
  public Pageable getPageable(Sort sort) {
    return org.springframework.data.domain.PageRequest.of(page - 1, size, sort);
  }
  
}
