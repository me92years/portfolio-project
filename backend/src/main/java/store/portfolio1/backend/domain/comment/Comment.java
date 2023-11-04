package store.portfolio1.backend.domain.comment;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import store.portfolio1.backend.common.entity.BaseTime;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.user.User;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "comments")
@ToString(exclude = {"post"})
public class Comment extends BaseTime {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long pid;

  private String innerText;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "parent_comment_pid")
  private Comment parentComment;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_pid")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_pid")
  private Post post;

  public void setParentComment(Comment parentComment) {
    this.parentComment = parentComment;
  }

  public void setInnerText(String innerText) {
    this.innerText = innerText;
  }

}
