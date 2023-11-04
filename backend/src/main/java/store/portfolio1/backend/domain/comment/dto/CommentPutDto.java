package store.portfolio1.backend.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;
import store.portfolio1.backend.domain.comment.Comment;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.user.User;

@Setter
@Getter
public class CommentPutDto {

  private long postPid;

  private long parentPid;

  private String innerText;

  public Comment toEntity(long userPid) {
    User user = User.builder().pid(userPid).build();
    Post post = Post.builder().pid(postPid).build();
    Comment parentComment = (parentPid > 0) ? Comment.builder().pid(parentPid).build() : null;
    Comment.CommentBuilder commentBuilder = Comment.builder()
        .user(user)
        .post(post)
        .innerText(innerText);
    if (parentComment != null) {
      commentBuilder.parentComment(parentComment);
    }
    return commentBuilder.build();
  }

}
