package illicodraco.project.facade;

import org.springframework.http.HttpStatus;

public class WebRenderedException extends RuntimeException {

  public WebRenderedException(String message) {
    super(message);
  }

  public HttpStatus getStatus() {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

}
