package subak.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MemberException.DuplicateMemberException.class)
    public ResponseEntity<String> handleDuplicateMemberException(MemberException.DuplicateMemberException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(MemberException.MemberNotFoundException.class)
    public ResponseEntity<String> handleMemberNotFoundException(MemberException.MemberNotFoundException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(MemberException.IncorrectPasswordException.class)
    public ResponseEntity<String> handleIncorrectPasswordException(MemberException.IncorrectPasswordException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(MemberException.EmailFindFailedException.class)
    public ResponseEntity<String> handleEmailFindFailedException(MemberException.EmailFindFailedException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(MemberException.PasswordUpdateFailedException.class)
    public ResponseEntity<String> handlePasswordUpdateFailedException(MemberException.PasswordUpdateFailedException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(MemberException.FileUploadException.class)
    public ResponseEntity<String> handleFileUploadException(MemberException.FileUploadException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}