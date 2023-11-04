package store.portfolio1.backend.domain.comment.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import store.portfolio1.backend.domain.comment.Comment;
import store.portfolio1.backend.domain.user.User;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CommentGetDto {

  private long pid;
  
  private long parentPid;
  
  private String writerName;
  
  private String writerImage;
  
  private String writerEmail;
  
  private String innerText;
  
  private String regDate;
  
  private String modDate;
  
  @Builder
  public CommentGetDto(long pid, long parentPid, String writerName, String writerImage, String writerEmail,
      String innerText, String regDate, String modDate) {
    this.pid = pid;
    this.parentPid = parentPid;
    this.writerName = writerName;
    this.writerImage = writerImage;
    this.writerEmail = writerEmail;
    this.innerText = innerText;
    this.regDate = regDate;
    this.modDate = modDate;
  }
  
  public static CommentGetDto fromEntity(Comment comment) {
    User user = comment.getUser();
    CommentGetDto commentGetDTO= CommentGetDto.builder()
        .pid(comment.getPid())
        .writerImage(user.getProfileImage())
        .writerName(user.getProfileName())
        .writerEmail(user.getEmail())
        .innerText(comment.getInnerText())
        .regDate(comment.getRegDate().toString())
        .modDate(comment.getModDate().toString())
        .build();
    Comment parentComment = comment.getParentComment();
    if (parentComment != null) {
      commentGetDTO.setParentPid(parentComment.getPid());
    }
    return commentGetDTO;
  }

  private void setParentPid(long parentPid) {
    this.parentPid = parentPid;
  }
  
}
