package subak.backend.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import subak.backend.domain.TestMember;

@SpringBootTest
class TestMemberRepositoryTest {

    @Autowired
    TestMemberRepository testMemberRepository;

    @Test
    @Transactional
    //@Rollback(value = false)
    public void testMember() throws Exception{
        TestMember testMember = new TestMember();
        testMember.setUsername("memberA");

        Long saveId = testMemberRepository.save(testMember);

        TestMember findMember = testMemberRepository.find(saveId);

        Assertions.assertThat(findMember.getId()).isEqualTo(testMember.getId());
        Assertions.assertThat(findMember.getUsername()).isEqualTo(testMember.getUsername());
    }
}