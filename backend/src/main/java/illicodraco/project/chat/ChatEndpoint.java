package illicodraco.project.chat;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.function.Predicate;

@ServerEndpoint(
  value = "/chat/{username}",
  decoders = MessageReadWrite.class,
  encoders = MessageReadWrite.class)
public class ChatEndpoint {

  private Session session;
  private String username;
  private static final Set<ChatEndpoint> chatEndpoints = new CopyOnWriteArraySet<>();
  private static final Map<String, String> users = new HashMap<>();

  @OnOpen
  public void onOpen(Session session, @PathParam("username") String username) throws IOException, EncodeException {
    this.session = session;
    chatEndpoints.add(this);
    users.put(session.getId(), username);
    this.username = username;

    Message message = new Message();
    message.setFrom(username);
    message.setContent("*arrive en renfort !*");
    broadcast(message);
  }

  @OnMessage
  public void onMessage(Session session, Message message) throws IOException, EncodeException {
    message.setFrom(users.get(session.getId()));
    if (message.getTo() == null || message.getTo().isBlank()) broadcast(message);
    else broadcast(message, endpoint -> endpoint.username.equals(message.getTo()));
  }

  @OnClose
  public void onClose(Session session) throws IOException, EncodeException {
    chatEndpoints.remove(this);
    Message message = new Message();
    message.setFrom(users.get(session.getId()));
    message.setContent("*a cru qu'il était discret en partant...*");
    broadcast(message);
  }

  @OnError
  public void onError(Session session, Throwable throwable) {
    // TODO gestion d'erreurs
  }

  private static void broadcast(Message message, Predicate<ChatEndpoint> predicate) {
    chatEndpoints.forEach(endpoint -> {
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
