package store.portfolio1.backend.domain.poster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import store.portfolio1.backend.domain.poster.Poster;

public interface PosterRepository extends JpaRepository<Poster, Long>{

}
