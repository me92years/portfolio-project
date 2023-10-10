package store.portfolio1.backend.domain.auth.service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Date;
import java.util.Locale;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.auth.dto.AuthDTO;
import store.portfolio1.backend.domain.user.Role;
import store.portfolio1.backend.domain.user.Social;
import store.portfolio1.backend.domain.user.User;
import store.portfolio1.backend.domain.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class DefaultAuthService implements AuthService {

  private final UserRepository userRepository;
  
  private final String AUTHORIZATION = "Authorization";

  @Value("${secrets.token.access.expiration}")
  private long SECRET_ACCESS_EXPIRATION;

  @Value("${secrets.token.refresh.expiration}")
  private long SECRET_REFRESH_EXPIRATION;
  
  @Value("${secrets.token.secret.key}")
  private String secretKey;
  
  @Value("${secrets.cookie.expiration}")
  private long SECRET_COOKIE_EXPIRATION;
  
  @Value("${secrets.cookie.domain}")
  private String SECRET_COOKIE_DOMAIN;
  
  @Value("${secrets.cookie.path}")
  private String SECRET_COOKIE_PATH;

  private String decode(String token) {
    byte[] decodedBytes = Base64.getUrlDecoder().decode(token.getBytes());
    String decodedToken = new String(decodedBytes, StandardCharsets.UTF_8);
    return decodedToken;
  }
  
  private String encode(String jwts) {
    byte[] encodedBytes = Base64.getUrlEncoder().encode(jwts.getBytes());
    String encodedToken = new String(encodedBytes, StandardCharsets.UTF_8);
    return encodedToken;
  }
  
  private String returnToken(String username, Social social, Role role, Date expiration) {
    String jwts = Jwts.builder()
        .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
        .setSubject(username)
        .claim("social", social)
        .claim("role", role.getCode())
        .setExpiration(expiration)
        .compact();

    return encode(jwts);
  }

  @Override
  public String generateAccessToken(String username, Social social, Role role) {
    Date expiration = Date.from(Instant.now().plusMillis(SECRET_ACCESS_EXPIRATION));
    return returnToken(username, social, role, expiration);
  }

  @Override
  public String generateRefreshToken(String username, Social social, Role role) {
    Date expiration = Date.from(Instant.now().plusMillis(SECRET_REFRESH_EXPIRATION));
    return returnToken(username, social, role, expiration);
  }

  @Transactional
  @Override
  public void updateRefreshToken(String username, Social social, String refreshToken) {
    User user = userRepository.loadUserByUsername(username, social)
        .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
    user.setRefreshToken(refreshToken);
    userRepository.save(user);
  }

  @Override
  public String generateAuthorization(String username, Social social, String accessToken) {
    ZonedDateTime zonedDateTime = ZonedDateTime
        .ofInstant(Instant.now().plusMillis(SECRET_COOKIE_EXPIRATION), ZoneId.of("GMT"));
    String expiration = zonedDateTime.format(DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm:ss z", Locale.ENGLISH));
    
    StringBuilder sb = new StringBuilder(AUTHORIZATION);
    sb.append("=")
      .append(accessToken)
      .append("/" + username)
      .append("/" + social.name())
      .append("; httponly")
      .append("; domain=")
      .append(SECRET_COOKIE_DOMAIN)
      .append("; path=")
      .append(SECRET_COOKIE_PATH)
      .append("; samesite=lax")
      .append("; expires=")
      .append(expiration);
    
    return sb.toString();
  }

  @Override
  public String[] validateCookie(Cookie[] cookies) {
    String[] datas = null;
    
    for (Cookie cookie : cookies) {
      if (cookie.getName().equals(AUTHORIZATION)) {
        datas = cookie.getValue().split("/");
      }
    }
    
    return datas;
  }

  @Override
  public Authentication validateAndReturn(HttpServletRequest request, String token) {
    Claims claim = Jwts.parser()
        .setSigningKey(secretKey.getBytes())
        .parseClaimsJws(decode(token))
        .getBody();
    
    String username = claim.getSubject();
    Social social = Social.valueOf((String) claim.get("social"));
    User user = userRepository.loadUserByUsername(username, social).get();
    AuthDTO authDTO = AuthDTO.from(user);
    
    return new UsernamePasswordAuthenticationToken(
        authDTO, 
        "", 
        authDTO.getAuthorities());
  }

  @Override
  public HttpHeaders generateDeleteCookies() {
    HttpHeaders headers = new HttpHeaders();
    String deleteForAuthorization = createDeleteForAuthorization();
    headers.set(HttpHeaders.SET_COOKIE, deleteForAuthorization);
    return headers;
  }

  private String createDeleteForAuthorization() {
    ZonedDateTime zonedDateTime = ZonedDateTime
        .ofInstant(Instant.now().minusMillis(1000L), ZoneId.of("GMT"));
    String expiration = zonedDateTime.format(DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm:ss z", Locale.ENGLISH));
    StringBuilder sb = new StringBuilder(AUTHORIZATION);
    sb.append("=NONE")
      .append("; httponly")
      .append("; domain=")
      .append(SECRET_COOKIE_DOMAIN)
      .append("; path=")
      .append(SECRET_COOKIE_PATH)
      .append("; samesite=lax")
      .append("; expires=")
      .append(expiration)
      ;
    return sb.toString();
  }
  
}
