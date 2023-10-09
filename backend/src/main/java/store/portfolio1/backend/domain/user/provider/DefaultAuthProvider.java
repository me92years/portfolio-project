package store.portfolio1.backend.domain.user.provider;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.auth.dto.AuthDTO;
import store.portfolio1.backend.domain.user.Social;
import store.portfolio1.backend.domain.user.User;
import store.portfolio1.backend.domain.user.repository.UserRepository;
import store.portfolio1.backend.domain.user.request.LoginRequest;

@Component
@RequiredArgsConstructor
public class DefaultAuthProvider implements AuthenticationProvider {
  
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  
  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    LoginRequest requestDTO = (LoginRequest) authentication.getPrincipal();
    String username = requestDTO.getUsername();
    String password = requestDTO.getPassword();
    Social social = requestDTO.getSocial();
    
    User user = userRepository.loadUserByUsername(username, social).orElseThrow(() -> 
      new UsernameNotFoundException("존재하지 않는 사용자입니다."));
    
    String encodedPassword = user.getPassword();
    boolean matchResult = passwordEncoder.matches(password, encodedPassword);
    
    if (matchResult) {
      AuthDTO authDTO = AuthDTO.from(user);
      return new UsernamePasswordAuthenticationToken(authDTO, encodedPassword);
    }
    
    throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.isAssignableFrom(UsernamePasswordAuthenticationToken.class);
  }

}
