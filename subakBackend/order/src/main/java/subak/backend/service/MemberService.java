package subak.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import subak.backend.domain.Member;
import subak.backend.repository.MemberRepository;
import java.util.Optional;

@Service
@Slf4j
//@Transactional(readOnly = true) // 읽기 전용일 경우 최적화
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원가입
     */
    public Long join(Member member) {
        validateDuplicateMember(member);
        validateRequiredFields(member);
        memberRepository.save(member);
        log.info(member.getEmail() + " 님이 회원가입 하였습니다.");
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

    /**
     * 로그인 (Email, Password 필요)
     */
    public String login(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 패스워드 일치 여부 확인
        if (passwordEncoder.matches(password, member.getPassword())) {
            return "로그인 성공";
        } else {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }


    //중복 회원 검증
    private void validateDuplicateMember(Member member) {
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
        if (findMember.isPresent()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
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


}
