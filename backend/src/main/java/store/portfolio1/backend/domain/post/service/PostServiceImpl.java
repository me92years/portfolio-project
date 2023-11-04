package store.portfolio1.backend.domain.post.service;

import java.util.List;
import java.util.function.Function;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import store.portfolio1.backend.domain.comment.Comment;
import store.portfolio1.backend.domain.comment.repository.CommentRepository;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.post.dto.PostGetDto;
import store.portfolio1.backend.domain.post.dto.PostModDto;
import store.portfolio1.backend.domain.post.dto.PostPutDto;
import store.portfolio1.backend.domain.post.dto.PostReqDto;
import store.portfolio1.backend.domain.post.dto.PostResDto;
import store.portfolio1.backend.domain.post.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final CommentRepository commentRepository;
  
  @Override
  public Long put(long authPid, PostPutDto putDto) {
    Post post = putDto.toEntity(authPid);
    return postRepository.save(post).getPid();
  }

  @Override
  public PostResDto get(PostReqDto reqDto) {
    Pageable pageable = reqDto.getPageable(Sort.by("pid").descending());
    long pid = reqDto.getPid();
    String keyword = reqDto.getKeyword();
    String category = reqDto.getCategory();
    Function<Post, PostGetDto> fn = (en) -> PostGetDto.ofEntity(en);
    Page<Post> result = postRepository.get(pageable, keyword, category, pid);
    PostResDto postResDto = new PostResDto(result, fn);
    
    return postResDto;
  }

  @Override
  public Long mod(String authEmail, PostModDto modDto) {
    Post post = postRepository.findById(modDto.getPid()).get();
    String postEmail = post.getUser().getEmail();
    if (postEmail.equals(authEmail)) {
      post.mod(modDto);
      return postRepository.save(post).getPid();
    }
    return 0L;
  }

  @Override
  @Transactional
  public Long del(String authEmail, long pid) {
    Post post = postRepository.findById(pid).get();
    String postEmail = post.getUser().getEmail();
    if (postEmail.equals(authEmail)) {
      List<Comment> comments = post.getComments();
      commentRepository.deleteAll(comments);
      postRepository.delete(post);
      return 1L;
    }
    return 0L;
  }

}
