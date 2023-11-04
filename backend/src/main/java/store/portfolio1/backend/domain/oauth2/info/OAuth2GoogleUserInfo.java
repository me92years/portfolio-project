package store.portfolio1.backend.domain.oauth2.info;

import java.util.Map;

public class OAuth2GoogleUserInfo extends OAuth2UserInfo {

  public OAuth2GoogleUserInfo(Map<String, Object> attributes) {
    super(attributes);
  }

  @Override
  public String getSid() {
    return (String) attributes.get("sub");
  }

  @Override
  public String getEmail() {
    return (String) attributes.get("email");
  }

  @Override
  public String getProfileImage() {
    return (String) attributes.get("picture");
  }

  @Override
  public String getProfileName() {
    return (String) attributes.get("name");
  }
  
}
