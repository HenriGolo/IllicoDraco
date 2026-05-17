package illicodraco.project.game;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.function.Predicate;

@Component
@ServerEndpoint(
    value = "/game/{code}/{username}",
    decoders = GameMessageReadWrite.class,
    encoders = GameMessageReadWrite.class)
public class GameEndpoint {

  private static final Set<GameEndpoint> ENDPOINTS = new CopyOnWriteArraySet<>();
  private static final Map<String, String> USERS = new HashMap<>();

  private Session session;
  private String code;

  @OnOpen
  public void onOpen(Session session, @PathParam("username") String username, @PathParam("code") String code) throws IOException, EncodeException {
    this.session = session;
    this.code = code;
    ENDPOINTS.add(this);
    USERS.put(session.getId(), username);

    List<String> joueurs = GameState.JOUEURS.getOrDefault(code, new ArrayList<>());
    if (joueurs.size() < GameState.NB_JOUEURS_MAX) {
      joueurs.add(username);
      GameState.JOUEURS.put(code, joueurs);

      GameMessage message = new GameMessage();
      message.setSystem(true);
      message.setContent(username + " arrive en renfort !");
      broadcast(message);
    } else {
      GameMessage message = new GameMessage();
      message.setSystem(true);
      message.setContent("Désolé " + username + ", la partie est déjà pleine !");
      session.getBasicRemote().sendObject(message);
      session.close(new CloseReason(CloseReason.CloseCodes.TRY_AGAIN_LATER, "Partie pleine"));
    }
  }

  @OnMessage
  public void onMessage(Session session, GameMessage message) throws IOException, EncodeException {
    message.setNum(getPlayerNumber(USERS.get(session.getId())));
    message.setSystem(false);
    broadcast(message, endpoint -> !USERS.get(endpoint.session.getId()).equals(session.getId()));
  }

  @OnClose
  public void onClose(Session session) {
    ENDPOINTS.remove(this);
    GameMessage message = new GameMessage();
    message.setSystem(true);
    message.setNum(getPlayerNumber(USERS.get(session.getId())));
    broadcast(message);
  }

  @OnError
  public void onError(Session session, Throwable throwable) {
    throwable.printStackTrace();
    GameMessage message = new GameMessage();
    message.setSystem(true);
    message.setContent(USERS.get(session.getId()) + " a rencontré une erreur : " + throwable.getMessage());
  }

  private static void broadcast(GameMessage message, Predicate<GameEndpoint> predicate) {
    ENDPOINTS.forEach(endpoint -> {
      synchronized (endpoint) {
        try {
          if (predicate.test(endpoint)) {
            endpoint.session.getBasicRemote().sendObject(message);
          }
        } catch (IOException | EncodeException e) {
          e.printStackTrace();
        }
      }
    });
  }

  private static void broadcast(GameMessage message) {
    broadcast(message, endpoint -> true);
  }

  private int getPlayerNumber(String username) {
    return (int) GameState.JOUEURS.get(code).stream().filter(username::equals).toArray()[0] + 1;
  }

}
