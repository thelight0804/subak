package subak.backend.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import subak.backend.domain.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    @Query("SELECT p FROM Post p JOIN p.hearts h WHERE h.member.id = :memberId")
    Page<Post> findLikedPosts(@Param("memberId") Long memberId, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.productStatus = 'COMPLETE' and p.member.id = :memberId")
    Page<Post> findCompletePosts(@Param("memberId") Long memberId, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.postStatus = 'HIDE' and p.member.id = :memberId")
    Page<Post> findHidePosts(@Param("memberId") Long memberId, Pageable pageable);
}