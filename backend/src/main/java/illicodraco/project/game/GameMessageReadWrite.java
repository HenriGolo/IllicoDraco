package illicodraco.project.game;

import jakarta.websocket.*;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.ObjectWriter;

public class GameMessageReadWrite implements Encoder.Text<GameMessage>, Decoder.Text<GameMessage> {

  /// Conversion vers JSON
  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
  /// DEBUG - ajoute des espaces pour la lisibilité
  private static final ObjectWriter OBJECT_WRITER = OBJECT_MAPPER.writer().withDefaultPrettyPrinter();
  /// Conversion depuis JSON
  //private static final ObjectWriter OBJECT_WRITER = OBJECT_MAPPER.writer();

  @Override
  public GameMessage decode(String s) throws DecodeException {
    return OBJECT_MAPPER.readValue(s, GameMessage.class);
  }

  @Override
  public boolean willDecode(String s) {
    return s != null;
  }

  @Override
  public String encode(GameMessage message) throws EncodeException {
    return OBJECT_WRITER.writeValueAsString(message);
  }

  @Override
  public void init(EndpointConfig endpointConfig) {
    Encoder.Text.super.init(endpointConfig);
    Decoder.Text.super.init(endpointConfig);
  }

  @Override
  public void destroy() {
    Encoder.Text.super.destroy();
    Decoder.Text.super.destroy();
  }

}
