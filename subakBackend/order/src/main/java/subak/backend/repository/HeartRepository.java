package subak.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import subak.backend.domain.Heart;
import subak.backend.domain.Member;
import subak.backend.domain.Post;

public interface HeartRepository extends JpaRepository<Heart, Long> {
    Heart findByPostAndMember(Post post, Member member);
}