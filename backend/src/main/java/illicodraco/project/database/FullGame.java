package illicodraco.project.database;

import org.springframework.http.HttpStatus;

public class FullGame extends WebRenderedException {

  public FullGame(String message) {
    super(message);
  }

  @Override
  public HttpStatus getStatus() {
    return HttpStatus.FORBIDDEN;
  }

}
