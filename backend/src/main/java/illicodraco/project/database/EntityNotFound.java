package illicodraco.project.database;

import org.springframework.http.HttpStatus;

public class EntityNotFound extends WebRenderedException {

  public EntityNotFound(String message) {
    super(message);
  }

  @Override
  public HttpStatus getStatus() {
    return HttpStatus.NOT_FOUND;
  }

}
