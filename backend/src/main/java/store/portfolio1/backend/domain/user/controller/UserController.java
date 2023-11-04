package store.portfolio1.backend.domain.user.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Mono;
import store.portfolio1.backend.domain.user.dto.UserPrincipalVo;

@RestController
@Log4j2
public class UserController {

  @GetMapping("/sign/auth")
  public Mono<ResponseEntity<UserPrincipalVo>> sign_auth(
      @AuthenticationPrincipal UserPrincipalVo principalVo) {
    return Mono.just(ResponseEntity.ok(principalVo))
        .onErrorReturn(ResponseEntity.internalServerError().body(null));
  }

  @GetMapping("/sign/out")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public Mono<ResponseEntity<Long>> sign_out(HttpServletRequest request,
      HttpServletResponse response) {
    return Mono.fromSupplier(() -> {
      Cookie[] cookies = request.getCookies();
      try {
        for (Cookie cookie : cookies) {
          cookie.setMaxAge(0);
          response.addCookie(cookie);
        }
        return ResponseEntity.ok(1L);
      } catch (Exception e) {
        log.error(String.format(">>>>> %s: %s", e.getClass().getSimpleName(), e.getMessage()));
        return ResponseEntity.internalServerError().body(0L);
      }
    });
  }


}
