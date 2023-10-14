package store.portfolio1.backend.domain.media.request;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import store.portfolio1.backend.domain.media.Category;
import store.portfolio1.backend.domain.media.Genre;
import store.portfolio1.backend.domain.media.Media;

@Setter
@Getter
@ToString
public class MediaRequest {

  private String title;

  private String releaseDate;

  private String category;

  private List<String> genre;
  
  private MultipartFile porterFile;

  public Media toEntity() {
    return Media.builder().title(title)
        .releaseDate(getReleaseDate(releaseDate))
        .category(getCategory(category))
        .genre(getGenre(genre))
        .build();
  }

  private LocalDate getReleaseDate(String releaseDate) {
    int[] date = Arrays.stream(releaseDate.split("/"))
        .mapToInt(Integer::parseInt)
        .toArray();
    return LocalDate.of(date[0], date[1], date[2]);
  }

  private Category getCategory(String category) {
    return Category.valueOf(category);
  }

  private List<Genre> getGenre(List<String> genre) {
    return genre.stream()
        .map(Genre::valueOf)
        .collect(Collectors.toList());
  }

}
