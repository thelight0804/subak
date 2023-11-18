package subak.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;
import subak.backend.domain.Member;
import subak.backend.dto.request.member.UpdatePasswordRequest;
import subak.backend.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberService memberService;


    @Test
    @Rollback(value = true)
    void 회원가입() throws Exception { // jUnit5부터는 public을 붙이지 않아도 된다.
        System.out.println("회원가입 테스트 시작");

        Member member = new Member();

        member.setEmail("0004@gmail.com");
        member.setPassword("0");
        member.setName("0");
        member.setPhone("01000000000");
        Long savedMemberId = memberService.join(member);

        Optional<Member> savedMember = memberRepository.findById(savedMemberId);
        assertTrue(savedMember.isPresent());

        System.out.println("회원가입 끝");
    }


    @Test // jUnit5에서는 @Test에 expected 속성이 지원되지 않는다.
    @Rollback
    void 중복회원검증() throws Exception {
        System.out.println("회원중복검증 테스트 시작");

        Member member1 = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member1);

        Member member2 = new Member();
        member2.setEmail("0004@gmail.com");

        assertThrows(IllegalStateException.class, () -> {
            memberService.join(member2);
        });

        System.out.println("회원중복검증 테스트 끝");
    }

    @Test
    @Rollback
    void 이메일찾기() throws Exception {
        System.out.println("이메일 찾기 테스트 시작");
        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        String findEmail = memberService.findMemberEmail(member.getName(), member.getPhone());
        assertEquals("0004@gmail.com", findEmail);

        System.out.println("이메일 찾기 테스트 끝");
    }

    @Test
    @Rollback
    void 이메일찾기_일치하는회원없음_예외() throws Exception {
        System.out.println("이메일찾기_일치하는회원없음_예외 테스트 시작");

        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        //name과 phone을 다른 정보로 입력했을 때, 예외가 발생하는지
        assertThrows(IllegalArgumentException.class,
                () -> memberService.findMemberEmail("nonUser", "01012345678"));

        System.out.println("이메일찾기_일치하는회원없음_예외 테스트 끝");
    }

    @Test
    @Rollback
    void 회원비밀번호_수정() throws Exception {
        System.out.println("비밀번호 수정 테스트 시작");

        Member member = createMember("test1@gmail.com", "TestUser", "password", "01012345678");
        memberService.join(member);

        // 비밀번호 수정
        String newPassword = "newPassword";
        String updateResult = memberService.updatePassword("test1@gmail.com", "TestUser", "01012345678", newPassword);
        assertEquals("비밀번호 수정 성공", updateResult);

        // 업데이트된 비밀번호로 로그인이 가능한지 확인
        Optional<Member> updatedMemberOptional = memberRepository.findById(member.getId());
        assertTrue(updatedMemberOptional.isPresent());

        // 새로운 비밀번호로 업데이트되었는지 확인
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        assertTrue(passwordEncoder.matches(newPassword, updatedMemberOptional.get().getPassword()));

        System.out.println("비밀번호 수정 테스트 끝");


    }

    @Test
    @Rollback
    void 로그인_성공() throws Exception {
        System.out.println("로그인 성공 테스트 시작");

        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        //비밀번호 재설정
        String newPassword = "newPassword";
        memberService.updatePassword(member.getEmail(), member.getName(), member.getPhone(), newPassword);
        String result = memberService.login("0004@gmail.com", newPassword);

        assertEquals("로그인 성공", result);

        System.out.println("로그인 성공 테스트 끝");
    }


    private Member createMember(String email, String name, String password, String phone) {
        Member member = new Member();
        member.setEmail(email);
        member.setName(name);
        member.setPassword(password);
        member.setPhone(phone);

        return member;
    }

    private UpdatePasswordRequest createUpdatePasswordRequest(Member member, String newPassword) {
        UpdatePasswordRequest updatePasswordRequest = new UpdatePasswordRequest();
        updatePasswordRequest.setEmail(member.getEmail());
        updatePasswordRequest.setName(member.getName());
        updatePasswordRequest.setPhone(member.getPhone());
        updatePasswordRequest.setNewPassword(newPassword);
        return updatePasswordRequest;
    }


}