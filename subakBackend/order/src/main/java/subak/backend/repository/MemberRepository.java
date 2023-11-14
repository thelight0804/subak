package subak.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import subak.backend.domain.Member;

import javax.transaction.Transactional;
import java.util.Optional;

public interface MemberRepository extends JpaRepository <Member, Long>{
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNamePhone(String name, String phone);

    Optional<Member> findByEmailNamePhone(String email, String name, String phone);

    @Transactional
    @Modifying
    @Query("update Member m set m.password = :newPassword where m.id = :memberId")
    void updatePassword(@Param("memberId") Long memberId, @Param("newPassword") String newPassword);

}


