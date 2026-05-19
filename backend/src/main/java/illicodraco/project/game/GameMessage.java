package illicodraco.project.game;

import illicodraco.project.game.chat.Message;

public class GameMessage {

  private boolean system;
  /// Type du message
  private String type;
  /// Classe du joueur
  private String classe;
  /// Numéro du joueur
  private int num;
  /// Message interne à la partie
  private Message message;
  /// Déplacements du joueur
  private int deltaX;
  private int deltaY;
  /// Position actuelle
  private int x;
  private int y;
  /// JSON au besoin
  private String jsonData;
  /// code de la partie (debug)
  private String code;
  /// Indique que le joueur a ramassé un objet
  private ObjetRamasse ramasse;
  /// Nom du produit placé dans la marmitte / le coffre
  private String produit;
  /// ID de l'enemi à créer
  private String ennemi;

  public boolean isSystem() {
    return system;
  }

  public void setSystem(boolean system) {
    this.system = system;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getClasse() {
    return classe;
  }

  public void setClasse(String classe) {
    this.classe = classe;
  }

  public int getNum() {
    return num;
  }

  public void setNum(int num) {
    this.num = num;
  }

  public Message getMessage() {
    return message;
  }

  public void setMessage(Message message) {
    this.message = message;
    this.message.setSystem(system);
  }

  public void setContent(String content) {
    if (message == null) message = new Message();
    message.setContent(content);
    message.setSystem(system);
  }

  public int getDeltaX() {
    return deltaX;
  }

  public void setDeltaX(int deltaX) {
    this.deltaX = deltaX;
  }

  public int getDeltaY() {
    return deltaY;
  }

  public void setDeltaY(int deltaY) {
    this.deltaY = deltaY;
  }

  public String getJsonData() {
    return jsonData;
  }

  public void setJsonData(String jsonData) {
    this.jsonData = jsonData;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public ObjetRamasse getRamasse() {
    return ramasse;
  }

  public void setRamasse(ObjetRamasse ramasse) {
    this.ramasse = ramasse;
  }

  public int getX() {
    return x;
  }

  public void setX(int x) {
    this.x = x;
  }

  public int getY() {
    return y;
  }

  public void setY(int y) {
    this.y = y;
  }

  public String getProduit() {
    return produit;
  }

  public void setProduit(String produit) {
    this.produit = produit;
  }

  public String getEnnemi() {
    return ennemi;
  }

  public void setEnnemi(String ennemi) {
    this.ennemi = ennemi;
  }
}
