package store.portfolio1.backend.domain.media.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.media.Media;
import store.portfolio1.backend.domain.media.repository.MediaRepository;
import store.portfolio1.backend.domain.media.request.MediaRequest;

@Service
@RequiredArgsConstructor
public class DefaultMediaService implements MediaService {
  
  private final MediaRepository mediaRepository;
  
  @Override
  @Transactional
  public Long addDefaultMedia(MediaRequest mediaRequest) {
    Media defaultMedia = mediaRequest.toDefaultEntity();
    return mediaRepository.save(defaultMedia).getId();
  }
  
  
  
}
