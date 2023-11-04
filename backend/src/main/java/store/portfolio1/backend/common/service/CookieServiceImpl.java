package store.portfolio1.backend.common.service;

import javax.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CookieServiceImpl implements CookieService {

  @Value("${secrets.cookie.expiration:0}")
  private int COOKIE_EXPIRATION;
  
  @Value("${secrets.cookie.domain:default}")
  private String COOKIE_DOMAIN;
  
  @Value("${secrets.cookie.path:/}")
  private String COOKIE_PATH;
  
  @Value("${secrets.cookie.secure:true}")
  private boolean COOKIE_SECURE;
  
  private final String AUTHORIZATION = "Authorization";
  
  @Override
  public Cookie createJwtCookie(String jwtToken) {
    Cookie cookie = new Cookie(AUTHORIZATION, jwtToken);
    cookie.setDomain(COOKIE_DOMAIN);
    cookie.setPath(COOKIE_PATH);
    cookie.setMaxAge(COOKIE_EXPIRATION);
    cookie.setSecure(COOKIE_SECURE);
    cookie.setHttpOnly(true);
    return cookie;
  }

  @Override
  public Cookie getAuthorization(Cookie[] cookies) {
    Cookie authorization = null;
    for (Cookie cookie : cookies) {
      if (cookie.getName().equals(AUTHORIZATION)) {
        authorization = cookie;
        break;
      }
    }
    return authorization;
  }

  @Override
  public void overwriteCookie(Cookie authorization, Cookie jwtCookie) {
    authorization.setDomain(jwtCookie.getDomain());
    authorization.setPath(jwtCookie.getPath());
    authorization.setMaxAge(jwtCookie.getMaxAge());
    authorization.setValue(jwtCookie.getValue());
  }

}
