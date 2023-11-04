package store.portfolio1.backend.common.service;

import javax.servlet.http.Cookie;

public interface CookieService {

  Cookie createJwtCookie(String jwtToken);

  Cookie getAuthorization(Cookie[] cookies);

  void overwriteCookie(Cookie authorization, Cookie jwtCookie);

}
