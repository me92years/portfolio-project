package store.portfolio1.backend.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Role {
  
  ADMIN ("관리자", "ROLE_ADMIN"),
  USER  ("일반사용자", "ROLE_USER")
  ;
  
  private final String name;
  private final String code;
  
}
