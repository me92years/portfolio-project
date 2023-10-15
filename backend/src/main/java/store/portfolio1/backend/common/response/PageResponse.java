package store.portfolio1.backend.common.response;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.Getter;

@Getter
public class PageResponse<T, R> {

  private List<R> dtoList;
  private int totalPage;
  private int size;
  private int page;
  private int start, end;
  private boolean prev, next;
  private List<Integer> pageList;
  
  
  public PageResponse(Page<T> page, Function<T, R> fn) {
    this.totalPage = page.getTotalPages();
    this.dtoList = page.getContent().stream().map(fn).collect(Collectors.toList());
    Pageable pageable = page.getPageable();
    createPageResponse(pageable);
  }


  private void createPageResponse(Pageable pageable) {
    this.page = pageable.getPageNumber() + 1;
    this.size = pageable.getPageSize();
    int tempEnd = (int) (Math.ceil(page / 10.0) * 10);
    this.start = tempEnd - 9;
    this.prev = start > 1;
    this.end = totalPage > tempEnd ? tempEnd : totalPage;
    this.next = totalPage > tempEnd;
    this.pageList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
  }
  
}
