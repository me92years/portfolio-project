package store.portfolio1.backend.domain.post;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import store.portfolio1.backend.common.entity.BaseTime;
import store.portfolio1.backend.domain.comment.Comment;
import store.portfolio1.backend.domain.post.dto.PostModDto;
import store.portfolio1.backend.domain.user.User;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "posts")
@ToString(exclude = {"comments"})
public class Post extends BaseTime {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long pid;

  private String title;

  private String innerText;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_pid")
  private User user;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "post")
  private List<Comment> comments;

  public void mod(PostModDto modDto) {
    this.title = modDto.getTitle();
    this.innerText = modDto.getInnerText();
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

}
