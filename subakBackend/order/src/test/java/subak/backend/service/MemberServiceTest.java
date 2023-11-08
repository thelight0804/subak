package subak.backend.service;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import subak.backend.domain.Member;
import subak.backend.repository.MemberRepository;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberService memberService;

    @Test
    //@Transactional
    //@Rollback(value = false)
    public void 회원가입() throws Exception {

        Member member = new Member();
        member.setEmail("0000@gmail.com");
        member.setName("member1");
        member.setPassword("123-4567-8901");
        member.setNationality(Nationality.KOR);

        Long savedMember = memberService.join(member);

        Assertions.assertEquals(member, memberRepository.findOne(savedMember));
    }


    //@Test
    //public void 중복회원검증() throws Exception{}


}