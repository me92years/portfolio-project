package store.portfolio1.backend.common.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class BaseTime {
  
  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime regDate;
  
  @LastModifiedDate
  @Column(nullable = false, updatable = true)
  private LocalDateTime modDate;
  
}
