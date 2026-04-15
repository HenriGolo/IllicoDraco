package illicodraco.project.beans;

import jakarta.persistence.*;

// Classe java gérant l'entité "controles"
@Entity
public class Controles {

  // attributs
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;                    // clef primaire dans la BD

  private String toucheHaut = "Z";   // touche pour se déplacer vers le haut

  private String toucheGauche = "Q"; // touche pour se déplacer vers la gauche

  private String toucheBas = "S";   // touche pour se déplacer vers le bas

  private String toucheDroite = "D"; // touche pour se déplacer vers la droite

  private String attaquer = "SpaceBar"; // touche pour attaquer

  private String interagir = "F"; // touche pour intéragir

  private String prendreOuPoser = "A"; // touche pour prendre / poser un produit

  private String accesBoutique = "B"; // touche pour accéder à la boutique

  private String bestiaireOuLivreRecette = "R"; // touche pour ouvrir le bestiaire / livre de recettes

  private String chat = "T"; // touche pour ouvrir le chat
  
  // constructeur
  public Controles() {
  }


  // getters
  public int getId() {
    return id;
  }

  public String getToucheHaut() {
    return toucheHaut;
  }

  public String getToucheGauche() {
    return toucheGauche;
  }

  public String getToucheBas() {
    return toucheBas;
  }

  public String getToucheDroite() {
    return toucheDroite;
  }

  public String getAttaquer() {
    return attaquer;
  }

  public String getInteragir() {
    return interagir;
  }

  public String getPrendreOuPoser() {
    return prendreOuPoser;
  }

  public String getAccesBoutique() {
    return accesBoutique;
  }

  public String getBestiaireOuLivreRecette() {
    return bestiaireOuLivreRecette;
  }

  public String getChat() {
    return chat;
  }


  // setters
  public void setId(int id) {
    this.id = id;
  }


  public void setToucheHaut(String toucheHaut) {
    this.toucheHaut = toucheHaut;
  }


  public void setToucheGauche(String toucheGauche) {
    this.toucheGauche = toucheGauche;
  }


  public void setToucheBas(String toucheBas) {
    this.toucheBas = toucheBas;
  }


  public void setToucheDroite(String toucheDroite) {
    this.toucheDroite = toucheDroite;
  }


  public void setAttaquer(String attaquer) {
    this.attaquer = attaquer;
  }


  public void setInteragir(String interagir) {
    this.interagir = interagir;
  }


  public void setPrendreOuPoser(String prendreOuPoser) {
    this.prendreOuPoser = prendreOuPoser;
  }


  public void setAccesBoutique(String accesBoutique) {
    this.accesBoutique = accesBoutique;
  }


  public void setBestiaireOuLivreRecette(String bestiaireOuLivreRecette) {
    this.bestiaireOuLivreRecette = bestiaireOuLivreRecette;
  }


  public void setChat(String chat) {
    this.chat = chat;
  }

}
