package store.portfolio1.backend.domain.post.dto;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import store.portfolio1.backend.domain.comment.Comment;
import store.portfolio1.backend.domain.comment.dto.CommentGetDto;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.user.User;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostGetDto {

  private long pid;
  
  private String title;
  
  private String innerText;
  
  private String writerName;
  
  private String writerImage;
  
  private String writerEmail;
  
  private String regDate;
  
  private String modDate;
  
  private List<CommentGetDto> comments;
  
  @Builder
  public PostGetDto(long pid, String title, String innerText, String writerName, String writerImage, 
      String writerEmail, String regDate, String modDate, List<CommentGetDto> comments) {
    this.pid = pid;
    this.title = title;
    this.innerText = innerText;
    this.writerName = writerName;
    this.writerImage = writerImage;
    this.writerEmail = writerEmail;
    this.regDate = regDate;
    this.modDate = modDate;
    this.comments = comments;
  }
  
  public static PostGetDto ofEntity(Post post) {
    User user = post.getUser();
    List<Comment> comments = post.getComments();
    List<CommentGetDto> commentDtos = comments.stream()
        .map(CommentGetDto::fromEntity)
        .collect(Collectors.toList());
    return PostGetDto.builder()
        .pid(post.getPid())
        .title(post.getTitle())
        .innerText(post.getInnerText())
        .writerImage(user.getProfileImage())
        .writerName(user.getProfileName())
        .writerEmail(user.getEmail())
        .regDate(post.getRegDate().toString())
        .modDate(post.getModDate().toString())
        .comments(commentDtos)
        .build();
  }

}
