package store.portfolio1.backend.domain.post.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.user.User;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
public class PostRepositoryTests {

  @Autowired
  private PostRepository postRepository;

  @Test
  public void putTest() {
    List<Post> tempList = new ArrayList<>();
    IntStream.rangeClosed(1, 400).boxed().forEach(index -> {
      User user = User.builder().pid(1L).build();
      Post post =
          Post.builder().title("테스트 제목 " + index).innerText("테스트 내용 " + index).user(user).build();
      tempList.add(post);
    });
    postRepository.saveAll(tempList);
  }

}
