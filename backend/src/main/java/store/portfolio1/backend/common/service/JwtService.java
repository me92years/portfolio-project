package store.portfolio1.backend.common.service;

import javax.servlet.http.HttpServletRequest;
import io.jsonwebtoken.Claims;
import store.portfolio1.backend.domain.user.enums.Role;

public interface JwtService {

  String createJwtToken(String email, Role role);

  Claims validateAndgetClaims(HttpServletRequest request, String authorization);

  void setAuthentication(String email, Role role);

}
