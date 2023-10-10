package store.portfolio1.backend.domain.auth.dto;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import lombok.Getter;
import lombok.ToString;
import store.portfolio1.backend.domain.profile.Profile;
import store.portfolio1.backend.domain.user.Role;
import store.portfolio1.backend.domain.user.Social;

@Getter
@ToString
public class AuthDTO extends User {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  private long id;
  private Role role;
  private Social social;
  private Profile profile;

  public AuthDTO(String username, String password, boolean enabled, boolean accountNonExpired,
      boolean credentialsNonExpired, boolean accountNonLocked,
      Collection<? extends GrantedAuthority> authorities) {
    super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked,
        authorities);
  }

  public void setId(long id) {
    this.id = id;
  }
  
  public void setProfile(Profile profile) {
    this.profile = profile;
  }
  
  public void setSocial(Social social) {
    this.social = social;
  }
  
  public void setRole(Role role) {
    this.role = role;
  }

  public static AuthDTO from(store.portfolio1.backend.domain.user.User user) {
    AuthDTO dto = new AuthDTO(user.getUsername(), user.getPassword(), user.isEnabled(),
        user.isAccountNonExpired(), user.isCredentialsNonExpired(), user.isAccountNonLocked(),
        user.getAuthorities());
    dto.setId(user.getId());
    dto.setProfile(user.getProfile());
    dto.setSocial(user.getSocial());
    dto.setRole(user.getRole());
    return dto;
  }

}
