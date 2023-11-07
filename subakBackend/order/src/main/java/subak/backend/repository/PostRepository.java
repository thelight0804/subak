package subak.backend.repository;

import org.springframework.stereotype.Repository;
import subak.backend.domain.Post;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class PostRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Post post){
        em.persist(post);
    }


}
