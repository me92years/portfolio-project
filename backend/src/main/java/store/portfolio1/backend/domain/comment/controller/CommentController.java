package store.portfolio1.backend.domain.comment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import store.portfolio1.backend.domain.comment.dto.CommentDelDto;
import store.portfolio1.backend.domain.comment.dto.CommentModDto;
import store.portfolio1.backend.domain.comment.dto.CommentPutDto;
import store.portfolio1.backend.domain.comment.service.CommentService;
import store.portfolio1.backend.domain.user.dto.UserPrincipalVo;

@RestController
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;

  @PostMapping("/comment/put")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public Mono<ResponseEntity<Long>> put(@RequestBody CommentPutDto putDto,
      @AuthenticationPrincipal UserPrincipalVo principalVo) {
    return Mono.just(ResponseEntity.ok(commentService.put(principalVo.getId(), putDto)))
        .onErrorReturn(ResponseEntity.internalServerError().body(0L));
  }

  @PostMapping("/comment/mod")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public Mono<ResponseEntity<Long>> mod(@RequestBody CommentModDto modDto,
      @AuthenticationPrincipal UserPrincipalVo principalVo) {
    return Mono.just(ResponseEntity.ok(commentService.mod(principalVo.getEmail(), modDto)))
        .onErrorReturn(ResponseEntity.internalServerError().body(0L));
  }

  @PostMapping("/comment/del")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
  public Mono<ResponseEntity<Long>> del(@RequestBody CommentDelDto delDto,
      @AuthenticationPrincipal UserPrincipalVo principalVo) {
    return Mono.just(ResponseEntity.ok(commentService.del(principalVo.getEmail(), delDto)))
        .onErrorReturn(ResponseEntity.internalServerError().body(0L));
  }
}
