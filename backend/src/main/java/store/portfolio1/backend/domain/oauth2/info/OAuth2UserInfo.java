package store.portfolio1.backend.domain.oauth2.info;

import java.util.Map;
import lombok.Getter;

@Getter
public abstract class OAuth2UserInfo {
  
  protected Map<String, Object> attributes;
  
  protected OAuth2UserInfo(Map<String, Object> attributes) {
    this.attributes = attributes;
  }
  
  public abstract String getSid();
  
  public abstract String getEmail();
  
  public abstract String getProfileImage();
  
  public abstract String getProfileName();
  
}
