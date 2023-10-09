package store.portfolio1.backend.domain.user.request;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import store.portfolio1.backend.domain.user.Social;

@Setter
@Getter
@ToString
public class LoginRequest {

  private String username;
  
  private String password;
  
  private Social social;
  
  public UsernamePasswordAuthenticationToken getLoginToken() {
    return new UsernamePasswordAuthenticationToken(this, password);
  }
  
}
