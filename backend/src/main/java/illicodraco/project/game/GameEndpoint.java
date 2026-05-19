package illicodraco.project.game;

import illicodraco.project.repositories.OutilRepository;
import illicodraco.project.repositories.RecetteRepository;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.Timer;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.function.Predicate;

@Component
@ServerEndpoint(
    value = "/game/{code}/{username}",
    decoders = GameMessageReadWrite.class,
    encoders = GameMessageReadWrite.class)
public class GameEndpoint {

  @Autowired
  OutilRepository outilRepo;
  @Autowired
  RecetteRepository recetteRepo;

  private static final Set<GameEndpoint> ENDPOINTS = new CopyOnWriteArraySet<>();
  private static final Map<String, String> USERS = new HashMap<>();
  private static final ConcurrentMap<String, String[]> CLASSES = new ConcurrentHashMap<>();
  private static final ConcurrentMap<String, List<String>> MARMITES = new ConcurrentHashMap<>();
  private static final ConcurrentMap<String, Timer> TIMERS = new ConcurrentHashMap<>();
  // private static final ConcurrentMap<String, List<String>> COFFRES = new ConcurrentHashMap<>();
  private static GameEndpoint ADMIN;

  private Session session;
  private String code;

  @OnOpen
  public void onOpen(Session session, @PathParam("username") String username, @PathParam("code") String code) throws IOException, EncodeException {
    this.session = session;
    this.code = code;
    ENDPOINTS.add(this);
    USERS.put(session.getId(), username);
    if (code.equals("admin") && username.equals("admin")) ADMIN = this;

    List<String> joueurs = GameState.JOUEURS.getOrDefault(code, new ArrayList<>());
    if (joueurs.size() < GameState.NB_JOUEURS_MAX) {
      joueurs.add(username);
      GameState.JOUEURS.put(code, joueurs);

      GameMessage message = new GameMessage();
      message.setType("join");
      message.setSystem(true);
      message.setContent(username + " arrive en renfort !");
      // Gestion des classes dans le lobby
      int num = joueurs.size();
      message.setCode(code);
      message.setNum(num);
      switch_class(num, GameState.START_CLASS);
      message.setJsonData(getJsonDataClasses());
      message.setClasse(GameState.START_CLASS);
      broadcast(message, e -> true);
    } else {
      GameMessage message = new GameMessage();
      message.setSystem(true);
      message.setContent("Désolé " + username + ", la partie est déjà pleine !");
      session.getBasicRemote().sendObject(message);
      session.close(new CloseReason(CloseReason.CloseCodes.TRY_AGAIN_LATER, "Partie pleine"));
    }
  }

  @OnMessage
  public void onMessage(Session session, GameMessage message) {
    message.setNum(getPlayerNumber(USERS.get(session.getId())));
    message.setCode(code);
    message.setSystem(false);
    String type = message.getType();
    if (type != null && !type.isBlank()) {
      if (type.equals("switch_class")) {
        switch_class(message.getNum(), message.getClasse());
        message.setJsonData(getJsonDataClasses());
      }
      if (type.equals("remplir_marmite")) {
        message.setJsonData(getJsonData(remplirMarmite(message.getProduit())));
      }
      if (type.equals("start_marmite")) {
        startMarmite();
      }
      /*
      if (type.equals("remplir_coffre")) {
        message.setJsonData(getJsonData(addCoffre(message.getProduit())));
      }
      //*/
    }
    broadcast(message, endpoint -> !USERS.get(endpoint.session.getId()).equals(session.getId()));
  }

  @OnClose
  public void onClose(Session session) {
    ENDPOINTS.remove(this);
    GameMessage message = new GameMessage();
    message.setSystem(true);
    message.setNum(getPlayerNumber(USERS.get(session.getId())));
    message.setType("leave");
    message.setCode(code);
    broadcast(message);
    collapseOnLeave(USERS.get(session.getId()));
  }

  @OnError
  public void onError(Session session, Throwable throwable) {
    throwable.printStackTrace();
    GameMessage message = new GameMessage();
    message.setSystem(true);
    message.setContent(USERS.get(session.getId()) + " a rencontré une erreur : " + throwable.getMessage());
  }

  private static void broadcast(Collection<GameEndpoint> endpoints, GameMessage message, Predicate<GameEndpoint> predicate) {
    if (ADMIN != null) {
      try {
        ADMIN.session.getBasicRemote().sendObject(message);
      } catch (Throwable e) {
        e.printStackTrace();
      }
    }
    endpoints.forEach(endpoint -> {
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

  private void broadcast(GameMessage message, Predicate<GameEndpoint> predicate) {
    broadcast(
        ENDPOINTS.stream().filter(endpoint ->
            endpoint.code.equals(code)
        ).toList(),
        message,
        predicate
    );
  }

  private void broadcast(GameMessage message) {
    broadcast(message, endpoint -> true);
  }

  private int getPlayerNumber(String username) {
    for (int i = 0; i < GameState.JOUEURS.get(code).toArray().length; i++) {
      if (GameState.JOUEURS.get(code).get(i).equals(username)) {
        return i + 1;
      }
    }
    return -1;
  }

  private void collapseOnLeave(String username) {
    List<String> usernames = GameState.JOUEURS.get(code);
    List<Integer> indices = new ArrayList<>();
    int _i = 0;
    for (String _username : usernames) {
      if (_username.equals(username)) {
        indices.add(_i);
      }
      _i++;
    }
    List<String> rebuilt_usernames = new ArrayList<>();
    String[] old = CLASSES.get(code);
    String[] rebuilt = new String[CLASSES.get(code).length];
    int pos = 0;
    for (int i = 0; i < rebuilt.length; i++) {
      if (!indices.contains(i)) {
        rebuilt[pos++] = old[i];
        if (i < usernames.size()) rebuilt_usernames.add(usernames.get(i));
      }
    }
    GameState.JOUEURS.put(code, rebuilt_usernames);
    CLASSES.put(code, rebuilt);
  }

  public void switch_class(int numeroJoueur, String classe) {
    String[] classes = CLASSES.getOrDefault(code, new String[GameState.NB_JOUEURS_MAX]);
    classes[numeroJoueur - 1] = classe;
    CLASSES.put(code, classes);
  }

  public String[] getClasses() {
    return CLASSES.get(code);
  }

  private String getJsonData(List<String> data) {
    return getJsonData(data.toArray(new String[0]));
  }

  private String getJsonData(String[] data) {
    return Arrays.toString(
        Arrays.stream(data)
            .filter(Objects::nonNull)
            .map(classe -> "\"" + classe + "\"")
            .toArray());
  }

  private String getJsonDataClasses() {
    return getJsonData(getClasses());
  }

  private List<String> remplirMarmite(String produit) {
    List<String> contenu = MARMITES.getOrDefault(code, new ArrayList<>());
    contenu.add(produit);
    MARMITES.put(code, contenu);
    return contenu;
  }

  private void clearMarmite() {
    MARMITES.put(code, new ArrayList<>());
  }

  private List<String> getMarmite() {
    return MARMITES.getOrDefault(code, new ArrayList<>());
  }

  private void startMarmite() {
    TIMERS.put(code, new Timer(5000, e -> {
      clearMarmite();
      GameMessage message = new GameMessage();
      message.setType("fin_marmite");
      message.setCode(code);
      message.setProduit("beurre");
      broadcast(message);
      TIMERS.get(code).stop();
      TIMERS.put(code, null);
    }));
    TIMERS.get(code).start();
  }

  /*
  private List<String> addCoffre(String produit) {
    List<String> coffre = getCoffre();
    coffre.add(produit);
    COFFRES.put(code, coffre);
    return coffre;
  }

  private List<String> getCoffre() {
    return COFFRES.getOrDefault(code, new ArrayList<>());
  }
  //*/

}
