package store.portfolio1.backend.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.post.repository.support.PostSupportRepository;

public interface PostRepository extends JpaRepository<Post, Long>, PostSupportRepository {

}
