package subak.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.config.JwtTokenProvider;
import subak.backend.domain.Member;
import subak.backend.dto.request.member.*;
import subak.backend.dto.response.member.JoinResponse;
import subak.backend.dto.response.member.LoginResponse;
import subak.backend.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    @ApiOperation(value = "회원가입", notes = "필수값 : 아이디(이메일), 이름, 비밀번호, 휴대폰번호")
    @PostMapping("/user")
    public ResponseEntity<JoinResponse> joinMember(@RequestBody @Validated JoinRequest request) {
        Member member = memberService.join(request);
        String token = jwtTokenProvider.createToken(member.getEmail());

        JoinResponse joinResponse = JoinResponse.from(member, token);
        return ResponseEntity.ok(joinResponse);
    }

    @ApiOperation(value = "로그인", notes = "Email, PW를 통해 로그인한다.")
    @PostMapping("/user/sign-in")
    public ResponseEntity<LoginResponse> loginMember(@RequestBody LoginRequest loginRequest) {
        Member member = memberService.login(loginRequest.getEmail(), loginRequest.getPassword());
        String token = jwtTokenProvider.createToken(member.getEmail());

        LoginResponse loginResponse = LoginResponse.from(member, token);

        return ResponseEntity.ok(loginResponse);
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원 이메일을 통해 회원을 탈퇴시킨다.")
    @PatchMapping("/user/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody WithdrawRequest withdrawRequest,
                                           HttpServletRequest request) {
        String email = withdrawRequest.getEmail();
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


    @ApiOperation(value = "회원 프로필 수정", notes = "현재 로그인된 회원의 프로필 사진을 수정한다.")
    @PutMapping("/user/{userId}/profile")
    public ResponseEntity<String> updateProfile(@ModelAttribute UpdateProfileRequest updateProfileRequest,
                                                HttpServletRequest request) throws IOException {
        memberService.updateMember(updateProfileRequest.getName(), updateProfileRequest.getProfileImage(), request);
        return ResponseEntity.ok("Profile Updated success");
    }

    @ApiOperation(value = "회원 삭제", notes = "회원을 삭제합니다. (Test용)")
    @DeleteMapping("/user/delete/{userId}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long userId) {
        memberService.deleteMember(userId);
        return ResponseEntity.noContent().build();
    }
}