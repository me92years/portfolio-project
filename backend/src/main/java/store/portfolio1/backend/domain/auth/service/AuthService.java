package store.portfolio1.backend.domain.auth.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import store.portfolio1.backend.domain.user.Role;
import store.portfolio1.backend.domain.user.Social;

public interface AuthService {

  String generateAccessToken(String username, Social social, Role role);

  String generateRefreshToken(String username, Social social, Role role);

  void updateRefreshToken(String username, Social social, String refreshToken);

  String generateAuthorization(String username, Social social, String accessToken);

  String[] validateCookie(Cookie[] cookies);

  Authentication validateAndReturn(HttpServletRequest request, String string);

  HttpHeaders generateDeleteCookies();
  
}
