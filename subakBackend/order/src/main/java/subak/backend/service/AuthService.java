package subak.backend.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import subak.backend.domain.Member;
import subak.backend.exception.MemberException;
import subak.backend.repository.MemberRepository;
import subak.backend.config.JwtTokenProvider;

import javax.servlet.http.HttpServletRequest;

@Service
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    public AuthService(JwtTokenProvider jwtTokenProvider, MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberRepository = memberRepository;
    }

    public Member getAuthenticatedMember(HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization").substring(7); // Bearer 뒤의 토큰만 추출
        String email = jwtTokenProvider.getEmail(token); // 토큰에서 email 추출
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 사용자가 없습니다."));
    }

    public void validateToken(HttpServletRequest httpServletRequest, String email){
        String token = httpServletRequest.getHeader("Authorization").substring(7);
        String tokenEmail = jwtTokenProvider.getEmail(token);

        // 다른 토큰일 경우에 발생하는 오류
        if (!email.equals(tokenEmail)) {
            throw new MemberException.MemberWithdrawException("토큰이 변조되었습니다.");
        }

    }
}