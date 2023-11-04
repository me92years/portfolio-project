package store.portfolio1.backend.domain.oauth2.vo;

import java.util.Map;
import lombok.Getter;
import store.portfolio1.backend.domain.oauth2.info.OAuth2GoogleUserInfo;
import store.portfolio1.backend.domain.oauth2.info.OAuth2UserInfo;
import store.portfolio1.backend.domain.user.enums.Social;

@Getter
public class OAuth2AttributesVO {

  private Social social;
  private String usernameAttributeKey;
  private OAuth2UserInfo oAuth2UserInfoVo; 

  public OAuth2AttributesVO(Social social, String usernameAttributeKey,
      OAuth2UserInfo oAuth2UserInfoVo) {
    this.social = social;
    this.usernameAttributeKey = usernameAttributeKey;
    this.oAuth2UserInfoVo = oAuth2UserInfoVo;
  }

  public static OAuth2AttributesVO of(Social social, String usernameAttributeName,
      Map<String, Object> attributes) {
    if (Social.GOOGLE == social) {
      return ofGoogle(social, usernameAttributeName, attributes);
    }
    return null;
  }

  private static OAuth2AttributesVO ofGoogle(Social social, String usernameAttributeName,
      Map<String, Object> attributes) {
    return new OAuth2AttributesVO(social, usernameAttributeName, new OAuth2GoogleUserInfo(attributes));
  }

}
