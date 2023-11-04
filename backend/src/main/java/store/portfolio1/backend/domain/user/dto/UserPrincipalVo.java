package store.portfolio1.backend.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import store.portfolio1.backend.domain.user.User;

@Getter
public class UserPrincipalVo {

  private long id;
  
  private String email;
  
  private String profileImage;
  
  private String profileName;
  
  private String roleTitle;

  @Builder
  public UserPrincipalVo(long id, String email, String profileImage, String profileName,
      String roleTitle) {
    this.id = id;
    this.email = email;
    this.profileImage = profileImage;
    this.profileName = profileName;
    this.roleTitle = roleTitle;
  }

  public static UserPrincipalVo fromEntity(User user) {
    return UserPrincipalVo.builder()
        .id(user.getPid())
        .email(user.getEmail())
        .profileImage(user.getProfileImage())
        .profileName(user.getProfileName())
        .roleTitle(user.getRole().getTitle())
        .build();
  }
  
}
