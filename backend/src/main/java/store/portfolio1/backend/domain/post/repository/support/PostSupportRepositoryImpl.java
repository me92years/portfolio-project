package store.portfolio1.backend.domain.post.repository.support;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import store.portfolio1.backend.domain.post.Post;
import store.portfolio1.backend.domain.post.QPost;

@Repository
public class PostSupportRepositoryImpl extends QuerydslRepositorySupport
    implements PostSupportRepository {

  private final QPost post;

  public PostSupportRepositoryImpl() {
    super(Post.class);
    this.post = QPost.post;
  }

  @Override
  public Page<Post> get(Pageable pageable, String keyword, String category, long pid) {
    JPQLQuery<Post> query = from(post)
        .select(post)
        .groupBy(post)
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .orderBy(post.pid.desc())
        ;

    BooleanBuilder booleanBuilder = new BooleanBuilder(post.pid.gt(0L));
    if (pid > 0L) {
      booleanBuilder.and(post.pid.eq(pid));
    }

    if (!keyword.isEmpty()) {
      BooleanBuilder conditionBuilder = new BooleanBuilder();
      switch (category) {
        case "title":
          conditionBuilder.or(post.title.contains(keyword));
          break;
        case "writer":
          conditionBuilder.or(post.user.profileName.eq(keyword));
          break;
        case "content":
          conditionBuilder.or(post.innerText.eq(keyword));
          break;
      }
      booleanBuilder.and(conditionBuilder);
    }
    query.where(booleanBuilder);
    List<Post> result = query.fetch();
    long fetchCount = query.fetchCount();

    return new PageImpl<>(result, pageable, fetchCount);
  }

}
