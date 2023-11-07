package subak.backend.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import subak.backend.domain.Member;
import subak.backend.repository.MemberRepository;

import java.util.List;

@Service
@Transactional(readOnly = true) // 읽기 전용일 경우 최적화
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Long join(Member member) {
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getId();
    }

    //중복 회원 검증
    private void validateDuplicateMember(Member member) {
        List<Member> findMember = memberRepository.findByEmail(member.getEmail());
        if (!findMember.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    // 패스워드 효성 검증 (java 정규표현식)
//    private boolean isPasswordValid(String password) {
//        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$";
//        return password.matches(regex);
//    }


}
