package store.portfolio1.backend.domain.user.api;

import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import store.portfolio1.backend.domain.auth.dto.AuthDTO;
import store.portfolio1.backend.domain.auth.service.AuthService;
import store.portfolio1.backend.domain.user.Role;
import store.portfolio1.backend.domain.user.Social;
import store.portfolio1.backend.domain.user.request.LoginRequest;
import store.portfolio1.backend.domain.user.response.LoginResponse;

@RestController
@RequiredArgsConstructor
@Log4j2
public class UserApi {

  private final AuthenticationManager authenticationManager;
  private final AuthService authService;

  @PostMapping("/users/login")
  public ResponseEntity<Long> login(HttpServletResponse response,
      @RequestBody LoginRequest loginRequest) {
    try {
      UsernamePasswordAuthenticationToken loginToken = loginRequest.getLoginToken();
      Authentication authResult = authenticationManager.authenticate(loginToken);
      AuthDTO authDTO = (AuthDTO) authResult.getPrincipal();
      log.info(authDTO);
      String username = authDTO.getUsername();
      Social social = authDTO.getSocial();
      Role role = authDTO.getRole();
      String accessToken = authService.generateAccessToken(username, social, role);
      String refreshToken = authService.generateRefreshToken(username, social, role);
      authService.updateRefreshToken(username, social, refreshToken);
      String authorization = authService.generateAuthorization(username, social, accessToken);
      response.addHeader(HttpHeaders.SET_COOKIE, authorization);
      return ResponseEntity.ok(1L);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return ResponseEntity.ok(0L);
  }

  @GetMapping("/users/auth")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<LoginResponse> auth(@AuthenticationPrincipal AuthDTO authDTO) {
    LoginResponse loginResponse = LoginResponse.from(authDTO);
    return ResponseEntity.ok(loginResponse);
  }

  @GetMapping("/users/logout")
  public ResponseEntity<Long> logout() {
    try {
      HttpHeaders headers = authService.generateDeleteCookies();
      return ResponseEntity.ok().headers(headers).body(1L);
    } catch (Exception e) {
      return ResponseEntity.ok(0L);
    }
  }

}
