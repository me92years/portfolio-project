package store.portfolio1.backend.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.auth.filter.DefaultJwtAuthenticationFilter;
import store.portfolio1.backend.domain.auth.handler.DefaultAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
   
  private final DefaultJwtAuthenticationFilter defaultJwtAuthenticationFilter;
  private final DefaultAuthenticationEntryPoint defaultAuthenticationEntryPoint;
  
  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.addFilterAfter(defaultJwtAuthenticationFilter, LogoutFilter.class);
    http
      .headers(conf -> conf
          .frameOptions().disable())
      .logout(conf -> conf
          .disable())
      .httpBasic(conf -> conf
          .disable())
      .formLogin(conf -> conf
          .disable())
      .sessionManagement(conf -> conf
          .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeRequests(conf -> conf
          .antMatchers(HttpMethod.GET, "OPTIONS").permitAll()
          .antMatchers("/users/login").permitAll()
          .anyRequest().authenticated())
      .exceptionHandling(conf -> conf
          .authenticationEntryPoint(defaultAuthenticationEntryPoint))
      .csrf(conf -> conf
          .disable())
      .oauth2Client(conf -> conf.disable())
      ;
    
    return http.build();
  }
  
}
