package illicodraco.project.game;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class GameState {

  public static final int NB_JOUEURS_MAX = 4;
  /// Association code - liste de joueurs
  public static final ConcurrentMap<String, List<String>> JOUEURS = new ConcurrentHashMap<>();
  /// Classe de départ des joueurs
  public static final String START_CLASS = "guerrier";

}
