package store.portfolio1.backend.domain.post.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import store.portfolio1.backend.domain.post.dto.PostDelDto;
import store.portfolio1.backend.domain.post.dto.PostModDto;
import store.portfolio1.backend.domain.post.dto.PostPutDto;
import store.portfolio1.backend.domain.post.dto.PostReqDto;
import store.portfolio1.backend.domain.post.dto.PostResDto;
import store.portfolio1.backend.domain.post.service.PostService;
import store.portfolio1.backend.domain.user.dto.UserPrincipalVo;

@RestController
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;

  @PostMapping("/post/put")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public Mono<ResponseEntity<Long>> put(@RequestBody PostPutDto putDto, @AuthenticationPrincipal UserPrincipalVo principalVo) {
    return Mono.just(ResponseEntity.ok(postService.put(principalVo.getId(), putDto)))
        .onErrorReturn(ResponseEntity.internalServerError().body(0L));
  }

  @GetMapping("/post/get")
  public Mono<ResponseEntity<PostResDto>> get(@ModelAttribute PostReqDto reqDto) {
    return Mono.just(ResponseEntity.ok(postService.get(reqDto)))
        .onErrorReturn(ResponseEntity.internalServerError().body(null));
  }

  @PostMapping("/post/mod")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public Mono<ResponseEntity<Long>> mod(@RequestBody PostModDto modDto,
      @AuthenticationPrincipal UserPrincipalVo principalVo) throws Exception {
    return Mono.just(ResponseEntity.ok(postService.mod(principalVo.getEmail(), modDto)))
        .onErrorReturn(ResponseEntity.internalServerError().body(0L));
  }

  @PostMapping("/post/del")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public Mono<ResponseEntity<Long>> del(@RequestBody PostDelDto delDto,
      @AuthenticationPrincipal UserPrincipalVo principalVo) {
    return Mono.just(ResponseEntity.ok(postService.del(principalVo.getEmail(), delDto.getPid())))
        .onErrorReturn(ResponseEntity.internalServerError().body(0L));
  }

}
