package subak.backend.exception;

public class PostException {

    /**
     * 게시글 실패 예외 처리
     */
    public static class PostNotFoundException extends RuntimeException {
        public PostNotFoundException(String message) {
            super(message);
        }
    }
}
