package store.portfolio1.backend.domain.user.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import store.portfolio1.backend.domain.user.Social;
import store.portfolio1.backend.domain.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

  @Query(value = "SELECT u FROM User u WHERE u.username = :username AND u.social = :social")
  Optional<User> loadUserByUsername(@Param("username") String username,
      @Param("social") Social social);

}
