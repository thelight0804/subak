package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.domain.Member;
import subak.backend.dto.request.member.FindMemberEmailRequest;
import subak.backend.dto.request.member.JoinRequest;
import subak.backend.dto.request.member.LoginRequest;
import subak.backend.dto.request.member.UpdatePasswordRequest;
import subak.backend.exception.MemberException;
import subak.backend.service.MemberService;
import subak.backend.session.SessionConst;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
    public ResponseEntity<String> loginMember(@RequestBody LoginRequest loginRequest, HttpServletRequest httpServletRequest) {
        Member loginMember = memberService.login(loginRequest.getEmail(), loginRequest.getPassword());
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);
        return ResponseEntity.ok("Sign-in success");
    }

    @ApiOperation(value = "로그아웃", notes = "로그아웃 버튼을 통해 로그아웃한다.")
    @PostMapping("/user/logout")
    public ResponseEntity<String> logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return ResponseEntity.ok("Logout successful");
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원 아이디를 통해 회원을 탈퇴시킨다.")
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> withdraw(@PathVariable String email) {
        memberService.withdraw(email);
        return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
    }


    @ApiOperation(value = "회원 아이디(이메일) 찾기", notes = "회원 이름, 휴대폰 번호를 통해 회원 아이디를 찾는다.")
    @PostMapping("/user/email")
    public ResponseEntity<String> findMemberEmail(@RequestBody FindMemberEmailRequest request) {
        String email = memberService.findMemberEmail(request.getName(), request.getPhone());
        return ResponseEntity.ok(email);
    }

    @ApiOperation(value = "회원 비밀번호 재설정", notes = "회원 아이디(이메일), 이름, 휴대폰 번호를 통해 비밀번호를 재설정한다.")
    @PostMapping("/user/password")
    public ResponseEntity<String> findMemberPassword(@RequestBody UpdatePasswordRequest request) {
        String result = memberService.updatePassword(
                request.getEmail(),
                request.getName(),
                request.getPhone(),
                request.getNewPassword());
        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "회원 정보 수정", notes = "회원 아이디를 통해 이름과 프로필을 수정한다.")
    @PutMapping("/user/{userId}")
    public ResponseEntity<String> updateMember(@PathVariable Long userId,
                                               @RequestParam String name,
                                               @RequestParam MultipartFile file) {

        memberService.updateMember(userId, name, file);
        return ResponseEntity.ok("MemberUpdate successful");
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