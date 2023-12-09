package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.domain.Member;
import subak.backend.dto.request.member.FindMemberEmailRequest;
import subak.backend.dto.request.member.JoinRequest;
import subak.backend.dto.request.member.LoginRequest;
import subak.backend.dto.request.member.UpdatePasswordRequest;
import subak.backend.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @ApiOperation(value = "회원가입", notes = "필수값 : 아이디(이메일), 이름, 비밀번호, 휴대폰번호")
    @PostMapping("/user")
    public ResponseEntity<String> joinMember(@RequestBody @Validated JoinRequest request) {
        Member member = mapToMember(request);
        memberService.join(member);
        return ResponseEntity.ok("Sign-up success");
    }

    @ApiOperation(value = "로그인", notes = "Email, PW를 통해 로그인한다.")
    @PostMapping("/user/sign-in")
    public ResponseEntity<String> loginMember(@RequestBody LoginRequest loginRequest) {
        String token = memberService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원 이메일을 통해 회원을 탈퇴시킨다.")
    @PatchMapping("/user/{email}")
    public ResponseEntity<String> withdraw(@PathVariable String email,
                                           HttpServletRequest request) {
        memberService.withdraw(email, request);
        return ResponseEntity.ok("Withdraw success.");
    }

    @ApiOperation(value = "회원 아이디(이메일) 찾기", notes = "회원 이름, 휴대폰 번호를 통해 회원 아이디를 찾는다.")
    @PostMapping("/user/email")
    public ResponseEntity<String> findMemberEmail(@RequestBody FindMemberEmailRequest request) {
        String email = memberService.findMemberEmail(request.getName(), request.getPhone());
        return ResponseEntity.ok("You Email : " + email);
    }

    @ApiOperation(value = "회원 비밀번호 재설정", notes = "회원 아이디(이메일), 이름, 휴대폰 번호를 통해 비밀번호를 재설정한다.")
    @PostMapping("/user/password")
    public ResponseEntity<String> findMemberPassword(@RequestBody UpdatePasswordRequest request) {
        String result = memberService.updatePassword(request);
        return ResponseEntity.ok("Password Reset success");
    }


    @ApiOperation(value = "회원 프로필 수정", notes = "회원 아이디를 통해 프로필 사진을 수정한다.")
    @PutMapping("/user/{userId}/profile")
    public ResponseEntity<String> updateProfile(@PathVariable Long userId,
                                                @RequestParam String name,
                                                @RequestParam MultipartFile profileImage,
                                                HttpServletRequest request) throws IOException {

        Member member = memberService.findMemberById(userId);
        memberService.updateMember(userId, name, profileImage, request);
        return ResponseEntity.ok("Profile Updated success");
    }

    @ApiOperation(value = "회원 삭제", notes = "회원을 삭제합니다. (Test용)")
    @DeleteMapping("/user/delete/{userId}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long userId) {
        memberService.deleteMember(userId);
        return ResponseEntity.noContent().build();
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