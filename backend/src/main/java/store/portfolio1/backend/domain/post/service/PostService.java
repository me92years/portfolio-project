package store.portfolio1.backend.domain.post.service;

import store.portfolio1.backend.domain.post.dto.PostModDto;
import store.portfolio1.backend.domain.post.dto.PostPutDto;
import store.portfolio1.backend.domain.post.dto.PostReqDto;
import store.portfolio1.backend.domain.post.dto.PostResDto;

public interface PostService {

  Long put(long authPid, PostPutDto putDto);

  Long mod(String authEmail, PostModDto modDto);
  
  Long del(String authEmail, long pid); 
  
  PostResDto get(PostReqDto reqDto);
  
}
