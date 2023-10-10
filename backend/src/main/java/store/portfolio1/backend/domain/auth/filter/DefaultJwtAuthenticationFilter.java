package store.portfolio1.backend.domain.auth.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.auth.dto.AuthDTO;
import store.portfolio1.backend.domain.auth.service.AuthService;
import store.portfolio1.backend.domain.user.Role;
import store.portfolio1.backend.domain.user.Social;

@Component
@RequiredArgsConstructor
public class DefaultJwtAuthenticationFilter extends OncePerRequestFilter {

  private final AuthService authService;

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    return request.getServletPath().equals("/users/login");
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    Cookie[] cookies = null;
    String[] datas = null;
    try {
      cookies = request.getCookies();
      datas = authService.validateCookie(cookies);
      Authentication authentication = authService.validateAndReturn(request, datas[0]);
      AuthDTO authDTO = (AuthDTO) authentication.getPrincipal();

      SecurityContextHolder.getContext().setAuthentication(authentication);
      successAuthenticate(response, authDTO);
    } catch (Exception e) {
      request.setAttribute("exception", e.getClass().getSimpleName());
      String username = (datas != null && datas[1] != null) ? datas[1] : "";
      String social = (datas != null && datas[2] != null) ? datas[2] : "";
      if (username != null && social != null) {
        request.setAttribute("username", username);
        request.setAttribute("social", social);
      }
    }

    filterChain.doFilter(request, response);
  }

  private void successAuthenticate(HttpServletResponse response, AuthDTO authDTO) {
    String username = authDTO.getUsername();
    Social social = authDTO.getSocial();
    Role role = authDTO.getRole();
    String accessToken = authService.generateAccessToken(username, social, role);
    String refreshToken = authService.generateRefreshToken(username, social, role);
    authService.updateRefreshToken(username, social, refreshToken);
    String authorization = authService.generateAuthorization(username, social, accessToken);
    response.addHeader(HttpHeaders.SET_COOKIE, authorization);
  }

}
