package store.portfolio1.backend.domain.comment.service;

import store.portfolio1.backend.domain.comment.dto.CommentDelDto;
import store.portfolio1.backend.domain.comment.dto.CommentModDto;
import store.portfolio1.backend.domain.comment.dto.CommentPutDto;

public interface CommentService {

  Long put(long authId, CommentPutDto putDto);
  
  Long mod(String authEmail, CommentModDto modDto);
  
  Long del(String authEmail, CommentDelDto delDto);
  
}
