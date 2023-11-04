package store.portfolio1.backend.domain.user.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import store.portfolio1.backend.common.service.CookieService;
import store.portfolio1.backend.common.service.JwtService;
import store.portfolio1.backend.domain.user.enums.Role;

@Component
@RequiredArgsConstructor
@Log4j2
public class UserAuthenticationFilter extends OncePerRequestFilter {

  private final CookieService cookieService;
  private final JwtService jwtService;

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    return request.getServletPath().equals("/sign/in");
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    Cookie[] cookies = request.getCookies();
    try {
      Cookie authorization = cookieService.getAuthorization(cookies);
      String authorizationValue = authorization.getValue();
      Claims claims = jwtService.validateAndgetClaims(request, authorizationValue);
      String email = claims.getSubject();
      Role role = Role.valueOf((String) claims.get("role"));
      String jwtToken = jwtService.createJwtToken(email, role);
      Cookie jwtCookie = cookieService.createJwtCookie(jwtToken);
      cookieService.overwriteCookie(authorization, jwtCookie);
      response.addCookie(authorization);
      jwtService.setAuthentication(email, role);
    } catch (Exception e) {
      log.error(String.format(">>>>> %s: %s", e.getClass().getSimpleName(), e.getMessage()));
    }
    filterChain.doFilter(request, response);
  }

}
