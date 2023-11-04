package store.portfolio1.backend.domain.comment.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.comment.Comment;
import store.portfolio1.backend.domain.comment.dto.CommentDelDto;
import store.portfolio1.backend.domain.comment.dto.CommentModDto;
import store.portfolio1.backend.domain.comment.dto.CommentPutDto;
import store.portfolio1.backend.domain.comment.repository.CommentRepository;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;

  @Override
  public Long put(long authId, CommentPutDto putDto) {
    Comment comment = putDto.toEntity(authId);
    return commentRepository.save(comment).getPid();
  }

  @Override
  public Long mod(String authEmail, CommentModDto modDto) {
    Comment comment = commentRepository.findById(modDto.getPid()).get();
    if (comment.getUser().getEmail().equals(authEmail)) {
      comment.setInnerText(modDto.getInnerText());
      return commentRepository.save(comment).getPid();
    }
    return 0L;
  }

  @Override
  public Long del(String authEmail, CommentDelDto delDto) {
    Comment comment = commentRepository.findById(delDto.getPid()).get();
    if (comment.getUser().getEmail().equals(authEmail)) {
      commentRepository.delete(comment);
      return 1L;
    }
    return 0L;
  }


}
