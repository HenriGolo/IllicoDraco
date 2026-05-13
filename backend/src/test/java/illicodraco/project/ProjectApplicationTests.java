package illicodraco.project;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "app.websocket.enabled=false")
class ProjectApplicationTests {

  @Test
  void contextLoads() {
  }

}
