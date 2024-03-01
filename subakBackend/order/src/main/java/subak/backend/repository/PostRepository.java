package subak.backend.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import subak.backend.domain.Post;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    @Query(value = "SELECT p FROM Post p WHERE " +
            "(:keyword is null or lower(p.postTitle) like lower(concat('%', :keyword,'%')) or lower(p.content) like lower(concat('%', :keyword,'%')))",
            countQuery = "SELECT count(p) FROM Post p WHERE " +
                    "(:keyword is null or lower(p.postTitle) like lower(concat('%', :keyword,'%')) or lower(p.content) like lower(concat('%', :keyword,'%')))",
            nativeQuery = true)
    Page<Post> findByKeywordContainingInPostTitleOrContent(String keyword, Pageable pageable);
}