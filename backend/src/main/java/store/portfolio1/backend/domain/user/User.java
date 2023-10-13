package store.portfolio1.backend.domain.user;

import java.util.Collection;
import java.util.Collections;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import store.portfolio1.backend.domain.profile.Profile;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "USERS")
public class User implements UserDetails {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", updatable = false)
  private long id;

  @Column(unique = true)
  private String username;

  private String password;

  @Lob
  private String refreshToken;

  @Enumerated(EnumType.STRING)
  private Role role;

  @Enumerated(EnumType.STRING)
  private Social social;

  private boolean isAccountNonExpired;

  private boolean isAccountNonLocked;

  private boolean isCredentialsNonExpired;

  private boolean isEnabled;

  @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
  private Profile profile;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singleton(new SimpleGrantedAuthority(role.getCode()));
  }

  @Builder
  public User(String username, String password, Role role, Social social, Profile profile) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.social = social;
    this.profile = profile;
    this.isAccountNonExpired = true;
    this.isAccountNonLocked = true;
    this.isCredentialsNonExpired = true;
    this.isEnabled = true;
  }

  public void setRefreshToken(String refreshToken) {
    this.refreshToken = refreshToken;
  }

}
