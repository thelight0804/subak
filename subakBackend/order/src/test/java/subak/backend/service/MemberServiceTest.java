package subak.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;
import subak.backend.domain.Member;
import subak.backend.repository.MemberRepository;
import javax.transaction.Transactional;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberService memberService;


    @Test
    @Transactional
    @Rollback(value = true)
    void 회원가입() throws Exception { // jUnit5부터는 public을 붙이지 않아도 된다.

        Member member = new Member();

        member.setEmail("0004@gmail.com");
        member.setPassword("0");
        member.setName("0");
        member.setPhone("01000000000");
        Long savedMember = memberService.join(member);

        Assertions.assertEquals(member, memberRepository.findOne(savedMember));
    }


    @Test // jUnit5에서는 @Test에 expected 속성이 지원되지 않는다.
    @Transactional
    @Rollback
    void 중복회원검증() throws Exception {

        Member member1 = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member1);

        Member member2 = new Member();
        member2.setEmail("0004@gmail.com");

        assertThrows(IllegalStateException.class, () -> {
            memberService.join(member2);
        });
    }

    @Test
    @Transactional
    @Rollback
    void 이메일찾기() throws Exception {
        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        String findEmail = memberService.findMemberEmail(member.getName(), member.getPhone());
        assertEquals("0004@gmail.com", findEmail);
    }

    @Test
    @Transactional
    @Rollback
    void 이메일찾기_일치하는회원없음_예외() throws Exception {
        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        //name과 phone을 다른 정보로 입력했을 때, 예외가 발생하는지
        assertThrows(IllegalArgumentException.class,
                () -> memberService.findMemberEmail("nonUser", "01012345678"));

    }

    @Test
    @Transactional
    @Rollback
    void 비밀번호찾기_일치하는회원() throws Exception {
        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        String newPassword = "newPassword";
        memberService.findPassword(member.getEmail(), member.getName(), member.getPhone(), newPassword);

        // 업데이트된 비밀번호로 로그인이 가능한지 확인
        Optional<Member> updatedMemberOptional = memberRepository.findByEmail(member.getEmail());
        assertTrue(updatedMemberOptional.isPresent());

        // BCryptPasswordEncoder를 사용하여 암호화된 비밀번호를 확인
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        assertTrue(passwordEncoder.matches(newPassword, updatedMemberOptional.get().getPassword()));
    }

    @Test
    @Transactional
    @Rollback
    void 로그인_성공() throws Exception{
        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        String newPassword = "newPassword";
        memberService.findPassword(member.getEmail(), member.getName(), member.getPhone(), newPassword);
        String result = memberService.login("0004@gmail.com", newPassword);

        assertEquals("로그인 성공", result);
    }


    private Member createMember(String email, String name, String password, String phone) {
        Member member = new Member();
        member.setEmail(email);
        member.setName(name);
        member.setPassword(password);
        member.setPhone(phone);
        return member;
    }


}