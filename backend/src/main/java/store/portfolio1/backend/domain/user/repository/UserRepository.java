package store.portfolio1.backend.domain.user.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import store.portfolio1.backend.domain.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findUserByEmail(String email);
  
}
