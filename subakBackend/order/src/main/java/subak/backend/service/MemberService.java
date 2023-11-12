package subak.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import subak.backend.domain.Member;
import subak.backend.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // 읽기 전용일 경우 최적화
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private PasswordEncoder passwordEncoder;

    /**
     * 회원가입
     */
    @Transactional
    public Long join(Member member) {
        validateDuplicateMember(member);
        validateRequiredFields(member);
        memberRepository.save(member);
        return member.getId();
    }

    /**
     * 아이디(Email) 찾기
     */
    public String findMemberEmail(String name, String phone) {
        Optional<Member> foundMember = memberRepository.findByNamePhone(name, phone);
        Member member = foundMember.orElseThrow(() -> new IllegalArgumentException("일치하는 회원 정보가 없습니다."));
        return member.getEmail();
    }


    /**
     * 비밀번호(Password) 찾기
     */
    public String findPassword(String email, String name, String phone, String newPassword) {
        Optional<Member> foundMember = memberRepository.findByEmailNamePhone(email, name, phone);
        Member member = foundMember.orElseThrow(() -> new IllegalArgumentException("일치하는 회원 정보가 없습니다."));

        // 비밀번호 재설정
        String encodedNewPassword = passwordEncoder.encode(newPassword);

        // 비밀번호 업데이트
        memberRepository.updatePassword(member.getId(), encodedNewPassword);

        return "비밀번호 재설정 성공";
    }






    //중복 회원 검증
    private void validateDuplicateMember(Member member) {
        List<Member> findMember = memberRepository.findByEmail(member.getEmail());
        if (!findMember.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    // 필수 필드 검증
    private void validateRequiredFields(Member member) {
        if (member.getEmail() == null || member.getEmail().trim().isEmpty() ||
                member.getName() == null || member.getName().trim().isEmpty() ||
                member.getPassword() == null || member.getPassword().trim().isEmpty() ||
                member.getPhone() == null || member.getPhone().trim().isEmpty()) {
            throw new IllegalArgumentException("이메일, 이름, 비밀번호, 휴대폰은 필수 입력 값입니다. (공백 문자열 불가능)");
        }
    }

    // 패스워드 효성 검증 (java 정규표현식)
//    private boolean isPasswordValid(String password) {
//        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$";
//        return password.matches(regex);
//    }


}
