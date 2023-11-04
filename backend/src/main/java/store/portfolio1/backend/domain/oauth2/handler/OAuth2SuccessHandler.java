package store.portfolio1.backend.domain.oauth2.handler;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.common.service.CookieService;
import store.portfolio1.backend.common.service.JwtService;
import store.portfolio1.backend.domain.oauth2.vo.OAuth2UserVo;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

  private final JwtService jwtService;
  private final CookieService cookieService;
  
  @Value("${site.client.url}")
  private String SITE_CLIENT_URL;
  
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    OAuth2UserVo oAuth2UserVo = (OAuth2UserVo) authentication.getPrincipal();
    String jwtToken = jwtService.createJwtToken(oAuth2UserVo.getEmail(), oAuth2UserVo.getRole());
    Cookie jwtCookie = cookieService.createJwtCookie(jwtToken);
    response.addCookie(jwtCookie);
    response.sendRedirect(SITE_CLIENT_URL);
  }

}
