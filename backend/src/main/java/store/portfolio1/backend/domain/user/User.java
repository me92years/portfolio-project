package store.portfolio1.backend.domain.user;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import store.portfolio1.backend.common.entity.BaseTime;
import store.portfolio1.backend.domain.comment.Comment;
import store.portfolio1.backend.domain.oauth2.info.OAuth2UserInfo;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.user.enums.Role;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "users")
public class User extends BaseTime {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long pid;

  @Column(unique = true)
  private String sid;

  @Column(unique = true)
  private String username;

  private String password;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String profileName;

  @Column(nullable = false)
  private String profileImage;

  @Lob
  private String refreshJwt;

  @Column(nullable = false)
  private boolean isSocial;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
  public List<Post> posts;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
  public List<Comment> comments;

  public static User createByOAuth2UserInfo(OAuth2UserInfo oAuth2UserInfo) {
    return User.builder().sid(oAuth2UserInfo.getSid())
        .email(oAuth2UserInfo.getEmail())
        .profileImage(oAuth2UserInfo.getProfileImage())
        .profileName(oAuth2UserInfo.getProfileName())
        .isSocial(true).role(Role.USER).build();
  }

  public User updateByOAuth2UserInfo(OAuth2UserInfo oAuth2UserInfo) {
    this.profileImage = oAuth2UserInfo.getProfileImage();
    this.profileName = oAuth2UserInfo.getProfileName();
    return this;
  }

  public void updateRefreshJwt(String refreshJwt) {
    this.refreshJwt = refreshJwt;
  }

}
