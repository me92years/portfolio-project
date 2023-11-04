package store.portfolio1.backend.domain.post.dto;

import lombok.Getter;
import lombok.Setter;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.user.User;

@Setter
@Getter
public class PostPutDto {

  private String title;

  private String innerText;

  public Post toEntity(long userPid) {
    User user = null;
    Post post = null;
    user = User.builder().pid(userPid).build();
    post = Post.builder().title(title).innerText(innerText).user(user).build();
    return post;
  }

}
