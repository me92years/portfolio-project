package store.portfolio1.backend.domain.user.response;

import lombok.Builder;
import lombok.Getter;
import store.portfolio1.backend.domain.auth.dto.AuthDTO;
import store.portfolio1.backend.domain.profile.Profile;

@Getter
public class LoginResponse {

  private String email;
  private String profileName;
  private String imageUrl;
  private String role;

  @Builder
  public LoginResponse(String email, String profileName, String imageUrl, String role) {
    this.email = email;
    this.profileName = profileName;
    this.imageUrl = imageUrl;
    this.role = role;
  }

  public static LoginResponse from(AuthDTO authDTO) {
    Profile profile = authDTO.getProfile();    
    return LoginResponse.builder()
        .email(profile.getEmail())
        .imageUrl(profile.getImageUrl())
        .profileName(profile.getName())
        .role(authDTO.getRole().getName())
        .build();
  }

}
