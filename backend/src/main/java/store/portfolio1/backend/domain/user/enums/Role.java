package store.portfolio1.backend.domain.user.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Role {
  ADMIN("ROLE_ADMIN", "관리"),
  USER("ROLE_USER", "일반")
  ;
  
  private final String value;
  private final String title;
  
}
