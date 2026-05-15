package illicodraco.project.facade;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(WebRenderedException.class)
  public ResponseEntity<Map<String, Object>> handleNotFound(WebRenderedException ex) {
    HttpStatus status = ex.getStatus();
    return ResponseEntity.status(status).body(Map.of(
        "code", status.getReasonPhrase(),
        "message", ex.getMessage(),
        "status", status.value(),
        "timestamp", Instant.now().toString()
    ));
  }

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<Map<String, Object>> handleFallback(Throwable ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
        "code", "Erreur Interne",
        "message", ex.getMessage(),
        "status", 500,
        "timestamp", Instant.now().toString()
    ));
  }
}
