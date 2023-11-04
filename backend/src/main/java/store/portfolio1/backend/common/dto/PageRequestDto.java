package store.portfolio1.backend.common.dto;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequestDto {

  private int page = 1;
  private int size = 10;
  
  public Pageable getPageable(Sort sort) {
    return PageRequest.of(page - 1, size, sort);
  }
  
}
