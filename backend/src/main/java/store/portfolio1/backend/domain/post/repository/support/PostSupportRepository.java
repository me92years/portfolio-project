package store.portfolio1.backend.domain.post.repository.support;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import store.portfolio1.backend.domain.post.Post;

public interface PostSupportRepository {

  Page<Post> get(Pageable pageable, String keyword, String category, long pid);
  
}
