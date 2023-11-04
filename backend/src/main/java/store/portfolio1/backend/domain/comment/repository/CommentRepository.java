package store.portfolio1.backend.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import store.portfolio1.backend.domain.comment.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}
