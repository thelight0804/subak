package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/user")
public class MemberController {

    private final MemberService memberService;

    @ApiOperation(value = "회원가입", notes = "필수값 : 아이디(이메일), 이름, 비밀번호, 휴대폰번호")
    @PostMapping("/") // ("/") == ("")
    public ResponseEntity<String> joinMember(@RequestBody @Validated JoinRequest request) {
        try {
            Member member = mapToMember(request);
            memberService.join(member);
            return ResponseEntity.ok("sign-up success");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("sign-up failed");
        }
    }

    @ApiOperation(value = "로그인", notes = "Email, PW를 통해 로그인한다.")
    @PostMapping("/sign-in")
    public ResponseEntity<String> loginMember(@RequestBody LoginRequest loginRequest) {
        String result = memberService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(result);
    }


    @ApiOperation(value = "회원 아이디(이메일) 찾기", notes = "회원 이름, 휴대폰 번호를 통해 회원 아이디를 찾는다.")
    @PostMapping("/email")
    public ResponseEntity<String> findMemberEmail(@RequestBody FindMemberEmailRequest request) {
        String email = memberService.findMemberEmail(request.getName(), request.getPhone());
        return ResponseEntity.ok(email);
    }


    @ApiOperation(value = "회원 비밀번호 재설정", notes = "회원 아이디(이메일), 이름, 휴대폰 번호를 통해 비밀번호를 재설정한다.")
    @PostMapping("/password")
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