package subak.backend.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import subak.backend.domain.Member;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;


    public void save(Member member){
        em.persist(member);
    }

    public Member findOne(Long email){
        return em.find(Member.class, email);
    }

    public List<Member> findByEmail(String email){
        return em.createQuery("select m from Member m where m.email = :member_email", Member.class)
                .setParameter("member_email", email)
                .getResultList();
    }





}
