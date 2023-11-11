package subak.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import subak.backend.domain.Member;
import subak.backend.repository.MemberRepository;


import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberService memberService;

    @Autowired
    EntityManager em;


    @Test
    @Transactional
    @Rollback(value = true)
    void 회원가입() throws Exception { // jUnit5부터는 public을 붙이지 않아도 된다.

        Member member = new Member();
        member.setEmail("0003@gmail.com");
        member.setName("0");
        member.setPassword("0");
        member.setPhone("01000000000");

        Long savedMember = memberService.join(member);

        Assertions.assertEquals(member, memberRepository.findOne(savedMember));
    }



    @Test // jUnit5에서는 @Test에 expected 속성이 지원되지 않는다.
    @Transactional
    @Rollback
    void 중복회원검증() throws Exception {

        Member member1 = new Member();
        member1.setEmail("0004@gmail.com");
        memberService.join(member1);

        Member member2 = new Member();
        member2.setEmail("0004@gmail.com");

        assertThrows(IllegalStateException.class, () -> {memberService.join(member2);});
    }


}