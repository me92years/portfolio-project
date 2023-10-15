package store.portfolio1.backend.domain.media.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import store.portfolio1.backend.domain.media.request.MediaRequest;
import store.portfolio1.backend.domain.media.service.MediaService;

@RestController
@RequiredArgsConstructor
public class MediaApi {

  private final MediaService mediaService;

  @PostMapping("/media/add")
  public Mono<ResponseEntity<Long>> addMedia(@RequestBody MediaRequest mediaRequest) {
    return Mono.fromSupplier(() -> {
      try {
        long addResult = mediaService.addDefaultMedia(mediaRequest);
        return ResponseEntity.ok(addResult);
      } catch (Exception e) {
        throw e;
      }
    }).onErrorReturn(ResponseEntity.ok(0L));
  }

}
