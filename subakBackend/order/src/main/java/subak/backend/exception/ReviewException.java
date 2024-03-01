package subak.backend.exception;

public class ReviewException {

    /**
     * 리뷰 조회 실패 예외 처리
     */
    public static class ReviewNotFoundException extends RuntimeException {
        public ReviewNotFoundException(String message) {
            super(message);
        }
    }

    public static class InvalidReviewAccessException extends RuntimeException {
        public InvalidReviewAccessException(String message) {
            super(message);
        }
    }
}
