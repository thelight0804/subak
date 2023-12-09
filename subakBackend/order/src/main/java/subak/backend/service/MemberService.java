package subak.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.config.JwtTokenProvider;
import subak.backend.domain.Member;
import subak.backend.domain.enumType.MemberStatus;
import subak.backend.dto.request.member.UpdatePasswordRequest;
import subak.backend.exception.MemberException;
import subak.backend.repository.MemberRepository;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

import static com.cloudinary.AccessControlRule.AccessType.token;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final FileUploadService fileUploadService;
    private final AuthService authService;

    /**
     * 회원가입
     */
    public Long join(Member member) {
        validateDuplicateMember(member);
        validateRequiredFields(member);

        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        memberRepository.save(member);
        log.info(member.getEmail() + " 님이 회원가입 하였습니다.");
        return member.getId();
    }

    /**
     * 아이디(Email) 찾기
     */
    public String findMemberEmail(String name, String phone) {
        Optional<Member> foundMember = memberRepository.findByNameAndPhone(name, phone);
        Member member = foundMember.orElseThrow(() -> new MemberException.EmailFindFailedException("이메일 찾기에 실패하였습니다."));
        return member.getEmail();
    }

    /**
     * 비밀번호(Password) 수정
     */
    public String updatePassword(UpdatePasswordRequest request) {
        Optional<Member> foundMember = memberRepository.findByEmailAndNameAndPhone(request.getEmail(), request.getName(), request.getPhone());

        if (foundMember.isPresent()) {
            Member member = foundMember.get();
            String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
            member.setPassword(encodedNewPassword);
            memberRepository.save(member);

            return "비밀번호 수정 성공";
        } else {
            throw new MemberException.PasswordUpdateFailedException("비밀번호 수정에 실패하였습니다.");
        }
    }


    /**
     * 로그인
     */
    public String login(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException.MemberNotFoundException("존재하지 않는 회원입니다."));


        // 회원 상태가 DELETE인 경우 로그인 불가
        if (member.getStatus() == MemberStatus.DELETE) {
            throw new MemberException.MemberWithdrawException("탈퇴한 회원입니다.");
        }

        // 패스워드 일치 여부 확인
        if (passwordEncoder.matches(password, member.getPassword())) {
            return jwtTokenProvider.createToken(email);
        } else {
            throw new MemberException.IncorrectPasswordException("회원정보가 일치하지 않습니다.");
        }
    }

    /**
     * 회원 탈퇴
     */
    public void withdraw(String email, HttpServletRequest request) {
        authService.validateToken(request, email);
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.setStatus(MemberStatus.DELETE);
            memberRepository.save(member);
        } else {
            throw new MemberException.MemberNotFoundException("회원을 찾을 수 없습니다.");
        }
    }

    /**
     * 회원 수정 (이름, 프로필)
     */
    public void updateMember(Long userId, String name, MultipartFile file, HttpServletRequest request) throws IOException { // 추가된 부분
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new MemberException.MemberNotFoundException("해당 사용자가 존재하지 않습니다. userId=" + userId));

        authService.validateToken(request, member.getEmail());

        member.setName(name);

        if (file != null) {
            try {
                String newImageUrl = fileUploadService.updateProfileImage(member.getProfileImage(), file);
                member.updateProfileImage(newImageUrl);
                memberRepository.save(member);
            } catch (IOException e) {
                throw new MemberException.FileUploadException("프로필 이미지 업로드 실패", e);
            }
        }
    }

    //회원 삭제 (Test용)
    public void deleteMember(Long userId) {
        memberRepository.deleteById(userId);
    }



    //중복 회원 검증
    private void validateDuplicateMember(Member member) {
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
        Optional<Member> findMemberByNameAndPhone = memberRepository.findByNameAndPhone(member.getName(), member.getPhone());

        if (findMember.isPresent()) {
            throw new MemberException.DuplicateMemberException("이미 존재하는 회원입니다.");
        }

        if (findMemberByNameAndPhone.isPresent()) {
            throw new MemberException.DuplicateMemberException("이름과 휴대폰 번호가 동일한 회원이 이미 존재합니다. 고객센터로 문의해 주세요.");
        }
    }

    //필수 필드 검증
    private void validateRequiredFields(Member member) {
        if (member.getEmail() == null || member.getEmail().trim().isEmpty() ||
                member.getName() == null || member.getName().trim().isEmpty() ||
                member.getPassword() == null || member.getPassword().trim().isEmpty() ||
                member.getPhone() == null || member.getPhone().trim().isEmpty()) {
            throw new IllegalArgumentException("이메일, 이름, 비밀번호, 휴대폰은 필수 입력 값입니다. (공백 문자열 불가능)");
        }
    }

    public Member findMemberById(Long userId) {
        return memberRepository.findById(userId)
                .orElseThrow(() -> new MemberException.MemberNotFoundException("해당 사용자가 존재하지 않습니다. userId=" + userId));
    }

}