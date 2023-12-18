package subak.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import subak.backend.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}