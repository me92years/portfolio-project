package store.portfolio1.backend.domain.oauth2.service;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;
import store.portfolio1.backend.domain.oauth2.info.OAuth2UserInfo;
import store.portfolio1.backend.domain.oauth2.vo.OAuth2AttributesVO;
import store.portfolio1.backend.domain.oauth2.vo.OAuth2UserVo;
import store.portfolio1.backend.domain.user.User;
import store.portfolio1.backend.domain.user.enums.Role;
import store.portfolio1.backend.domain.user.enums.Social;
import store.portfolio1.backend.domain.user.repository.UserRepository;

@Service
@Log4j2
public class OAuth2UserServiceImpl implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  private final UserRepository userRepository;
  private final DefaultOAuth2UserService defaultOAuth2UserService;
  
  @Autowired
  public OAuth2UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
    this.defaultOAuth2UserService = new DefaultOAuth2UserService();
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    try {
      String registrationId = userRequest.getClientRegistration().getRegistrationId();
      String usernameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
      Social social = getSocial(registrationId);
      OAuth2User oAuth2User = defaultOAuth2UserService.loadUser(userRequest);
      Map<String, Object> attributes = oAuth2User.getAttributes();
      OAuth2AttributesVO oAuth2AttributesVO = OAuth2AttributesVO.of(social, usernameAttributeName, attributes);
      OAuth2UserInfo oAuth2UserInfo = oAuth2AttributesVO.getOAuth2UserInfoVo();
      String email = oAuth2AttributesVO.getOAuth2UserInfoVo().getEmail();
      User user = getUser(email, oAuth2UserInfo);
      Role role = user.getRole();
      OAuth2UserVo oAuth2UserVo = OAuth2UserVo.createBy(email, role, usernameAttributeName, oAuth2UserInfo);
      return oAuth2UserVo;
    } catch (Exception e) {
      log.error(String.format(">>>>> %s: %s", e.getClass().getSimpleName(), e.getMessage()));
    }
    return null;
  }

  private User getUser(String email, OAuth2UserInfo oAuth2UserInfo) {
    User user = userRepository.findUserByEmail(email).orElse(null);
    user = (user == null) 
        ? User.createByOAuth2UserInfo(oAuth2UserInfo) 
        : user.updateByOAuth2UserInfo(oAuth2UserInfo);
    return userRepository.save(user);
  }

  private Social getSocial(String registrationId) {
    if (Social.GOOGLE.name().equals(registrationId.toUpperCase())) {
      return Social.GOOGLE;
    }
    return null;
  }
  
}
