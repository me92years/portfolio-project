package store.portfolio1.backend.domain.media;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import store.portfolio1.backend.domain.poster.Poster;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "MEDIAS")
public class Media {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "media_id", updatable = false)
  private long id;

  private String title;

  private LocalDateTime releaseDate;

  private String tagLine;
  
  private String synopsis;
  
  private String rating;
  
  private String runningTime;
  
  @Enumerated(EnumType.STRING)
  private Category category;
  
  @ElementCollection(fetch = FetchType.LAZY)
  private List<Poster> poster = new ArrayList<>();
  
  @ElementCollection(fetch = FetchType.LAZY)
  @Enumerated(EnumType.STRING)
  private List<Genre> genre = new ArrayList<>();

}
