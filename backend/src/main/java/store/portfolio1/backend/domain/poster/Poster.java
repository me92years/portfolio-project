package store.portfolio1.backend.domain.poster;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "POSTERS")
public class Poster {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "poster_id", updatable = false)
  private long id;

  private String path;

  private String uuid;

  private String posterFileName;

}
