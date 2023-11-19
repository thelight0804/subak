package subak.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import subak.backend.domain.Member;
import subak.backend.dto.request.member.FindMemberEmailRequest;
import subak.backend.dto.request.member.JoinRequest;
import subak.backend.dto.request.member.LoginRequest;
import subak.backend.dto.request.member.UpdatePasswordRequest;
import subak.backend.service.MemberService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 회원가입
     */
    @PostMapping("/user")
    public Long joinMember(@RequestBody @Validated JoinRequest request) {
        Member member = mapToMember(request);
        return memberService.join(member);
    }

    /**
     * 로그인
     */
    @PostMapping("/user/sign-in")
    public ResponseEntity<String> loginMember(@RequestBody LoginRequest loginRequest) {
        String result = memberService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(result);
    }


    /**
     * 회원 이메일 찾기
     */
    @PostMapping("/user/email")
    public ResponseEntity<String> findMemberEmail(@RequestBody FindMemberEmailRequest request) {
        String email = memberService.findMemberEmail(request.getName(), request.getPhone());
        return ResponseEntity.ok(email);
    }

    /**
     * 회원 비밀번호 수정 (찾기)
     */
    @PostMapping("/find-password")
    public ResponseEntity<String> findMemberPassword(@RequestBody UpdatePasswordRequest request) {
        String result = memberService.updatePassword(
                request.getEmail(),
                request.getName(),
                request.getPhone(),
                request.getNewPassword());
        return ResponseEntity.ok(result);
    }


    private Member mapToMember(JoinRequest request) {
        Member member = new Member();
        member.setEmail(request.getEmail());
        member.setName(request.getName());
        member.setPassword(request.getPassword());
        member.setPhone(request.getPhone());
        return member;
    }

}