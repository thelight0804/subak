package subak.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import subak.backend.domain.Member;
import subak.backend.domain.enumType.MemberStatus;
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
    @Autowired
    PasswordEncoder passwordEncoder;


    @Test
    @Rollback(value = true)
    void 회원가입() throws Exception { // jUnit5부터는 public을 붙이지 않아도 된다.

        Member member = new Member();

        member.setEmail("0004@gmail.com");
        member.setPassword("0");
        member.setName("0");
        member.setPhone("01000000000");
        Long savedMemberId = memberService.join(member);

        Optional<Member> savedMember = memberRepository.findById(savedMemberId);
        assertTrue(savedMember.isPresent());
    }


    @Test // jUnit5에서는 @Test에 expected 속성이 지원되지 않는다.
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
    @Rollback
    void 이메일찾기() throws Exception {
        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        String findEmail = memberService.findMemberEmail(member.getName(), member.getPhone());
        assertEquals("0004@gmail.com", findEmail);
    }

    @Test
    @Rollback
    void 이메일찾기_일치하는회원없음_예외() throws Exception {

        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
        memberService.join(member);

        //name과 phone을 다른 정보로 입력했을 때, 예외가 발생하는지
        assertThrows(IllegalArgumentException.class,
                () -> memberService.findMemberEmail("nonUser", "01012345678"));
    }

    @Test
    @Rollback
    void 회원비밀번호_수정() throws Exception {
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
    }

    @Test
    @Rollback
    void 로그인_성공() throws Exception {
        // Given
        String email = "0004@gmail.com";
        String password = "password123";
        String name = "name";
        String phone = "01012345678";

        Member member = new Member();
        member.setEmail(email);
        member.setPassword(password);
        member.setName(name);
        member.setPhone(phone);

        memberService.join(member);

        // When
        Member loginMember  = memberService.login(email, password);

        // Then
        assertNotNull(loginMember, "로그인 실패");
        assertEquals(email, loginMember.getEmail(), "로그인한 사용자의 이메일이 일치하지 않습니다.");
        assertEquals(name, loginMember.getName(), "로그인한 사용자의 이름이 일치하지 않습니다.");
        assertEquals(phone, loginMember.getPhone(), "로그인한 사용자의 전화번호가 일치하지 않습니다.");
    }

    @Test
    @Rollback
    void 회원탈퇴() throws Exception{
        // Given
        String email = "test5@gmail.com";
        String password = "password123";
        String name = "TestUser5";
        String phone = "01012345678";

        Member member = new Member();
        member.setEmail(email);
        member.setPassword(password);
        member.setName(name);
        member.setPhone(phone);

        memberService.join(member);

        // When
        memberService.withdraw(email);

        // Then
        Optional<Member> withdrawnMemberOptional = memberRepository.findByEmail(email);
        assertTrue(withdrawnMemberOptional.isPresent(), "탈퇴한 회원 정보를 찾을 수 없습니다.");
        assertEquals(MemberStatus.DELETE, withdrawnMemberOptional.get().getStatus(), "회원 상태가 탈퇴 상태가 아닙니다.");
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