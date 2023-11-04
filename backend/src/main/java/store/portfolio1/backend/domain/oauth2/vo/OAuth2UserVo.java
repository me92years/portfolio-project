package store.portfolio1.backend.domain.oauth2.vo;

import java.util.Collections;
import java.util.Map;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import lombok.Getter;
import store.portfolio1.backend.domain.oauth2.info.OAuth2UserInfo;
import store.portfolio1.backend.domain.user.enums.Role;

@Getter
public class OAuth2UserVo extends DefaultOAuth2User {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  private String email;
  private Role role;

  public OAuth2UserVo(Map<String, Object> attributes, String nameAttributeKey, String email,
      Role role) {
    super(Collections.singleton(new SimpleGrantedAuthority(role.getValue())), 
        attributes,
        nameAttributeKey);
    this.email = email;
    this.role = role;
  }

  public static OAuth2UserVo createBy(String email, Role role, String usernameAttributeName,
      OAuth2UserInfo oAuth2UserInfo) {
    return new OAuth2UserVo(oAuth2UserInfo.getAttributes(), usernameAttributeName, email, role);
  }

}
