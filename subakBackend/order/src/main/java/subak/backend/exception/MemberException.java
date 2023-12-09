package subak.backend.exception;

public class MemberException {

    /**
     * 회원 중복 예외처리
     */
    public static class DuplicateMemberException extends RuntimeException {
        public DuplicateMemberException(String message) {
            super(message);
        }
    }

    /**
     * 이메일 불일치 예외 처리
     */
    public static class MemberNotFoundException extends RuntimeException {
        public MemberNotFoundException(String message) {
            super(message);
        }
    }

    /**
     * 비밀번호 불일치 예외 처리
     */
    public static class IncorrectPasswordException extends RuntimeException {
        public IncorrectPasswordException(String message) {
            super(message);
        }
    }


    /**
     * 이메일 찾기 실패 예외 처리
     */
    public static class EmailFindFailedException extends RuntimeException {
        public EmailFindFailedException(String message) {
            super(message);
        }
    }

    /**
     * 비밀번호 수정 실패 예외 처리
     */
    public static class PasswordUpdateFailedException extends RuntimeException {
        public PasswordUpdateFailedException(String message) {
            super(message);
        }
    }

    /**
     * 파일 업로드 실패 예외 처리
     */
    public static class FileUploadException extends RuntimeException {
        public FileUploadException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    /**
     * 탈퇴한 회원이 로그인 시도할 경우 예외 처리
     */
    public static class MemberWithdrawException extends RuntimeException {
        public MemberWithdrawException(String message) {
            super(message);
        }
    }
}
