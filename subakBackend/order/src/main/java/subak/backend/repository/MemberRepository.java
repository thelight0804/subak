package subak.backend.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import subak.backend.domain.Member;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    /**
     * 회원 저장
     */
    public void save(Member member){
        em.persist(member);
    }

    /**
     * 이메일 통해 멤버 찾기
     */
    public Member findOne(Long email){
        return em.find(Member.class, email);
    }

    /**
     * 이메일 찾기
     */
    public Optional<Member> findByEmail(String email) {
        List<Member> result = em.createQuery("select m from Member m where m.email = :member_email", Member.class)
                .setParameter("member_email", email)
                .getResultList();

        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    /**
     * 이름, 휴대폰 찾기 (이메일 찾기 기능 구현시 사용)
     */
    public Optional<Member> findByNamePhone(String name, String phone) {
        List<Member> foundMembers = em.createQuery("select m from Member m where m.name = :member_name and m.phone = :member_phone", Member.class)
                .setParameter("member_name", name)
                .setParameter("member_phone", phone)
                .getResultList();

        return Optional.ofNullable(foundMembers.isEmpty() ? null : foundMembers.get(0));
    }

    /**
     * 이메일, 이름, 휴대폰 검색 (비밀번호 찾기 기능 구현시 사용)
     */
    public Optional<Member> findByEmailNamePhone(String email, String name, String phone) {
        List<Member> foundMembers = em.createQuery("select m from Member m where m.email = :member_email and m.name = :member_name and m.phone = :member_phone", Member.class)
                .setParameter("member_email", email)
                .setParameter("member_name", name)
                .setParameter("member_phone", phone)
                .getResultList();

        return Optional.ofNullable(foundMembers.isEmpty() ? null : foundMembers.get(0));
    }


    public void updatePassword(Long memberId, String newPassword) {
        Member member = em.find(Member.class, memberId);
        member.setPassword(newPassword);
    }

}

