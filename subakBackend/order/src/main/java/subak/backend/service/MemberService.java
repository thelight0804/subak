package subak.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import subak.backend.domain.Member;
import subak.backend.domain.enumType.MemberStatus;
import subak.backend.exception.MemberException;
import subak.backend.repository.MemberRepository;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
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
    public String updatePassword(String email, String name, String phone, String newPassword) {
        Optional<Member> foundMember = memberRepository.findByEmailAndNameAndPhone(email, name, phone);

        if (foundMember.isPresent()) {
            Member member = foundMember.get();
            String encodedNewPassword = passwordEncoder.encode(newPassword);
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
    public Member login(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException.MemberNotFoundException("존재하지 않는 회원입니다."));

        // 패스워드 일치 여부 확인
        if (passwordEncoder.matches(password, member.getPassword())) {
            return member;
        } else {
            throw new MemberException.IncorrectPasswordException("회원정보가 일치하지 않습니다.");
        }
    }

    /**
     * 회원 탈퇴
     */
    public void withdraw(String email) {
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
    public Member updateMember(Long userId, String name, MultipartFile file) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new MemberException.MemberNotFoundException("해당 사용자가 존재하지 않습니다. userId=" + userId));

        member.setName(name);
        member.setProfileImage(file);

        return memberRepository.save(member);
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

    //    /**
//     * AWS S3 프로필 수정
//     */
//    public String S3uploadFile(MultipartFile file) {
//        String bucketName = "bucket-name";
//        String key = "profile-pictures/" + file.getOriginalFilename();  // 저장할 위치와 파일 이름
//
//        S3Client s3 = S3Client.create();  // S3 클라이언트 생성
//
//        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                .bucket(bucketName)
//                .key(key)
//                .build();
//
//        try {
//            PutObjectResponse putObjectResponse = s3.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
//
//            // 업로드에 성공하면 파일의 URL을 반환
//            return "https://" + bucketName + ".s3.amazonaws.com/" + key;
//        } catch (IOException e) {
//            throw new MemberException.FileUploadException("업로드 실패", e);
//        }
//    }

}