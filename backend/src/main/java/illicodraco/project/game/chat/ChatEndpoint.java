package illicodraco.project.game.chat;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.function.Predicate;

@Component
@ServerEndpoint(
    value = "/chat/{username}",
    decoders = MessageReadWrite.class,
    encoders = MessageReadWrite.class)
public class ChatEndpoint {

  private static final Set<ChatEndpoint> ENDPOINTS = new CopyOnWriteArraySet<>();
  private static final Map<String, String> USERS = new HashMap<>();

  private Session session;

  @OnOpen
  public void onOpen(Session session, @PathParam("username") String username) throws IOException, EncodeException {
    this.session = session;
    ENDPOINTS.add(this);
    USERS.put(session.getId(), username);

    Message message = new Message();
    message.setSystem(true);
    message.setContent(username + " arrive en renfort !");
    broadcast(message);
  }

  @OnMessage
  public void onMessage(Session session, Message message) throws IOException, EncodeException {
    message.setFrom(USERS.get(session.getId()));
    message.setSystem(false);
    if (message.getTo() == null || message.getTo().isBlank()) broadcast(message);
    else broadcast(message, endpoint -> USERS.get(endpoint.session.getId()).equals(message.getTo()));
  }

  @OnClose
  public void onClose(Session session) throws IOException, EncodeException {
    ENDPOINTS.remove(this);
    Message message = new Message();
    message.setSystem(true);
    message.setContent(USERS.get(session.getId()) + " a cru qu'il était discret en partant...");
    broadcast(message);
  }

  @OnError
  public void onError(Session session, Throwable throwable) {
    throwable.printStackTrace();
    Message message = new Message();
    message.setSystem(true);
    message.setContent(USERS.get(session.getId()) + " a rencontré une erreur : " + throwable.getMessage());
  }

  private static void broadcast(Message message, Predicate<ChatEndpoint> predicate) {
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

  private static void broadcast(Message message) {
    broadcast(message, endpoint -> true);
  }
}
