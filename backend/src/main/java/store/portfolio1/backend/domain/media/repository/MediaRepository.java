package store.portfolio1.backend.domain.media.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import store.portfolio1.backend.domain.media.Media;

public interface MediaRepository extends JpaRepository<Media, Long>{

}
