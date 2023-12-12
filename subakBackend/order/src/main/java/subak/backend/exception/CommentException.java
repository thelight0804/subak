package subak.backend.exception;

public class CommentException {

    public static class CommentNotFoundException extends RuntimeException {
        public CommentNotFoundException(String message) {
            super(message);
        }
    }

    public static class UnauthorizedCommentUpdateException extends RuntimeException {
        public UnauthorizedCommentUpdateException(String message) {
            super(message);
        }
    }

    public static class UnauthorizedCommentDeletionException extends RuntimeException {
        public UnauthorizedCommentDeletionException(String message) {
            super(message);
        }
    }
}
