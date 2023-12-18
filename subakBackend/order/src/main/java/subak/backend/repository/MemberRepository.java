package subak.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import subak.backend.domain.Member;

import javax.transaction.Transactional;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNameAndPhone(String name, String phone);

    Optional<Member> findByEmailAndNameAndPhone(String email, String name, String phone);

    @Transactional
    @Modifying
    @Query("update Member m set m.password = :newPassword where m.email = :email and m.name = :name and m.phone = :phone")
    void updatePassword(@Param("email") String email, @Param("name") String name, @Param("phone") String phone, @Param("newPassword") String newPassword);
}