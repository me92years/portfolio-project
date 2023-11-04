package store.portfolio1.backend.common.service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import store.portfolio1.backend.domain.user.User;
import store.portfolio1.backend.domain.user.dto.UserPrincipalVo;
import store.portfolio1.backend.domain.user.enums.Role;
import store.portfolio1.backend.domain.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Log4j2
public class JwtServiceImpl implements JwtService {

  private final UserRepository userRepository;

  @Value("${secrets.token.access.expiration:0}")
  private Long TOKEN_ACCESS_EXPIRATION;

  @Value("${secrets.token.refresh.expiration:0}")
  private Long TOKEN_REFRESH_EXPIRATION;

  @Value("${secrets.token.token.secret:default}")
  private String TOKEN_SECRET_KEY;

  public String createJwtToken(String email, Role role) {
    String accessJwt = createAccessJwt(email, role, TOKEN_ACCESS_EXPIRATION);
    String refreshJwt = createAccessJwt(email, role, TOKEN_REFRESH_EXPIRATION);
    updateUserRefreshJwt(email, refreshJwt);
    return accessJwt;
  }

  private void updateUserRefreshJwt(String email, String refreshJwt) {
    User user = userRepository.findUserByEmail(email).get();
    user.updateRefreshJwt(refreshJwt);
    userRepository.save(user);
  }
  
  private String encodeToken(String value) {
    byte[] encodedBytes = Base64.getUrlEncoder().encode(value.getBytes());
    String encodedValue = new String(encodedBytes, StandardCharsets.UTF_8);
    return encodedValue;
  }
  
  private String decodeToken(String value) {
    byte[] decodedBytes = Base64.getUrlDecoder().decode(value);
    String decodedValue = new String(decodedBytes, StandardCharsets.UTF_8);
    return decodedValue;
  }

  private String createAccessJwt(String email, Role role, Long millis) {
    Date expiration = Date.from(Instant.now().plusMillis(millis));
    String jwt =
        Jwts.builder()
          .setExpiration(expiration)
          .setSubject(email)
          .claim("role", role.name())
          .signWith(SignatureAlgorithm.HS256, TOKEN_SECRET_KEY.getBytes())
          .compact();
    return encodeToken(String.format("%s %s", email, jwt));
  }
  
  @Override
  public Claims validateAndgetClaims(HttpServletRequest request, String authorization) {
    Claims claims = null;
    String decodedValue = decodeToken(authorization);
    String[] values = decodedValue.split(" ");
    String email = values[0]; 
    String jwt = values[1];
    try {
      claims = Jwts
          .parser()
          .setSigningKey(TOKEN_SECRET_KEY.getBytes())
          .parseClaimsJws(jwt)
          .getBody();      
    } catch (ExpiredJwtException | MalformedJwtException e) {
      log.error(String.format(">>>>> %s: %s", e.getClass().getSimpleName(), e.getMessage()));
      request.setAttribute("exception", e.getClass().getSimpleName());
      request.setAttribute("email", email);
    } catch (Exception e) {
      log.error(String.format(">>>>> %s: %s", e.getClass().getSimpleName(), e.getMessage()));
    }
    return claims;
  }

  @Override
  public void setAuthentication(String email, Role role) {
    User user = userRepository.findUserByEmail(email).get();
    UserPrincipalVo principalVo = UserPrincipalVo.fromEntity(user);
    Authentication authentication = new UsernamePasswordAuthenticationToken(principalVo, "",
        Collections.singleton(new SimpleGrantedAuthority(role.getValue())));
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }

}
