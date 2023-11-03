package subak.backend.repository;

import org.springframework.stereotype.Repository;
import subak.backend.domain.TestMember;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class TestMemberRepository {

    @PersistenceContext
    private EntityManager em;

    public Long save(TestMember testMember) {
        em.persist(testMember);
        return testMember.getId();
    }

    public TestMember find(Long id) {
        return em.find(TestMember.class, id);
    }
}