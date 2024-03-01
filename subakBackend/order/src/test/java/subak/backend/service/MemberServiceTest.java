//package subak.backend.service;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.test.annotation.Rollback;
//import subak.backend.domain.Member;
//import subak.backend.domain.enumType.MemberStatus;
//import subak.backend.dto.request.member.UpdatePasswordRequest;
//import subak.backend.exception.MemberException;
//import subak.backend.repository.MemberRepository;
//
//import javax.transaction.Transactional;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.when;
//
//@SpringBootTest
//@Transactional
//class MemberServiceTest {
//
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    MemberService memberService;
//    @Autowired
//    PasswordEncoder passwordEncoder;
//
//
//    @Test
//    @Rollback(value = true)
//    void 회원가입() throws Exception {
//        // given
//        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
//        Long savedMemberId = memberService.join(member);
//
//        // then
//        Optional<Member> savedMember = memberRepository.findById(savedMemberId);
//        assertTrue(savedMember.isPresent());
//    }
//
//
//    @Test
//    @Rollback
//    void 중복회원검증() throws Exception {
//        // given
//        Member member1 = createMember("0004@gmail.com", "0", "0", "01000000000");
//        memberService.join(member1);
//
//        // when
//        Member member2 = createMember("0004@gmail.com", "0", "0", "01000000000");
//
//        // then
//        assertThrows(MemberException.DuplicateMemberException.class, () -> {
//            memberService.join(member2);
//        });
//    }
//
//    @Test
//    @Rollback
//    void 이메일찾기() throws Exception {
//        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
//        memberService.join(member);
//
//        String findEmail = memberService.findMemberEmail(member.getName(), member.getPhone());
//        assertEquals("0004@gmail.com", findEmail);
//    }
//
//    @Test
//    @Rollback
//    void 이메일찾기_일치하는회원없음_예외() throws Exception {
//
//        Member member = createMember("0004@gmail.com", "0", "0", "01000000000");
//        memberService.join(member);
//
//        //name과 phone을 다른 정보로 입력했을 때, 예외가 발생하는지
//        assertThrows(MemberException.EmailFindFailedException.class,
//                () -> memberService.findMemberEmail("nonUser", "01012345678"));
//    }
//
//    @Test
//    @Rollback
//    void 회원비밀번호_수정() throws Exception {
//        Member member = createMember("test1@gmail.com", "TestUser", "password", "01012345678");
//        memberService.join(member);
//
//        // 비밀번호 수정
//        String newPassword = "newPassword";
//        String updateResult = memberService.updatePassword("test1@gmail.com", "TestUser", "01012345678", newPassword);
//        assertEquals("비밀번호 수정 성공", updateResult);
//
//        // 업데이트된 비밀번호로 로그인이 가능한지 확인
//        Optional<Member> updatedMemberOptional = memberRepository.findById(member.getId());
//        assertTrue(updatedMemberOptional.isPresent());
//
//        // 새로운 비밀번호로 업데이트되었는지 확인
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        assertTrue(passwordEncoder.matches(newPassword, updatedMemberOptional.get().getPassword()));
//    }
//
//    @Test
//    @Rollback
//    void 로그인_성공() throws Exception {
//        // Given
//        String email = "0004@gmail.com";
//        String password = "password123";
//        String name = "name";
//        String phone = "01012345678";
//
//        Member member = new Member();
//        member.setEmail(email);
//        member.setPassword(password);
//        member.setName(name);
//        member.setPhone(phone);
//
//        memberService.join(member);
//
//        // When
//        Member loginMember  = memberService.login(email, password);
//
//        // Then
//        assertNotNull(loginMember, "로그인 실패");
//        assertEquals(email, loginMember.getEmail(), "로그인한 사용자의 이메일이 일치하지 않습니다.");
//        assertEquals(name, loginMember.getName(), "로그인한 사용자의 이름이 일치하지 않습니다.");
//        assertEquals(phone, loginMember.getPhone(), "로그인한 사용자의 전화번호가 일치하지 않습니다.");
//    }
//
//    @Test
//    @Rollback
//    void 회원탈퇴() throws Exception {
//        // given
//        Member member = createMember("test5@gmail.com", "password123", "TestUser5", "01012345678");
//        memberService.join(member);
//
//        // when
//        memberService.withdraw(member.getEmail());
//
//        // then
//        Optional<Member> withdrawnMemberOptional = memberRepository.findByEmail(member.getEmail());
//        assertTrue(withdrawnMemberOptional.isPresent());
//        assertEquals(MemberStatus.DELETE, withdrawnMemberOptional.get().getStatus());
//    }
//
//    @Test
//    @Rollback
//    public void 회원정보수정() throws Exception {
//        // given
//        String email = "test1@gmail.com";
//        String oldName = "Old Name";
//        String password = "password123";
//        String phone = "01012345678";
//
//        Member member = createMember(email, oldName, password, phone);
//        memberService.join(member);
//
//        String newName = "New Name";
//        MockMultipartFile newFile = new MockMultipartFile("file", "hello.png", MediaType.IMAGE_PNG_VALUE, "Hello, World!".getBytes());
//
//        // when
//        memberService.updateMember(member.getId(), newName, newFile);
//
//        // then
//        Optional<Member> updatedMemberOptional = memberRepository.findById(member.getId());
//        assertTrue(updatedMemberOptional.isPresent());
//        assertEquals(newName, updatedMemberOptional.get().getName());
//        assertArrayEquals(newFile.getBytes(), updatedMemberOptional.get().getPicture());
//    }
//
//
//
//    private Member createMember(String email, String name, String password, String phone) {
//        Member member = new Member();
//        member.setEmail(email);
//        member.setName(name);
//        member.setPassword(password);
//        member.setPhone(phone);
//
//        return member;
//    }
//
//    private UpdatePasswordRequest createUpdatePasswordRequest(Member member, String newPassword) {
//        UpdatePasswordRequest updatePasswordRequest = new UpdatePasswordRequest();
//        updatePasswordRequest.setEmail(member.getEmail());
//        updatePasswordRequest.setName(member.getName());
//        updatePasswordRequest.setPhone(member.getPhone());
//        updatePasswordRequest.setNewPassword(newPassword);
//        return updatePasswordRequest;
//    }
//
//
//}