package store.portfolio1.backend.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.oauth2.handler.OAuth2SuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

  private final OAuth2SuccessHandler successHandler;
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .formLogin(c -> c.disable())
        .httpBasic(c -> c.disable())
        .oauth2Login(c -> c.successHandler(successHandler))
        .headers(c -> c.frameOptions().disable())
        .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeRequests(c -> c.anyRequest().permitAll())
        .csrf(c -> c.disable())
        .cors(c -> c.disable())
//        .exceptionHandling(c -> c.authenticationEntryPoint(authenticationEntryPoint))
        .build();
  }
  
}
