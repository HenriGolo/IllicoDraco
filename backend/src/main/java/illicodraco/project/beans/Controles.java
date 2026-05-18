package illicodraco.project.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// Classe java gérant l'entité "controles"
@Entity
public class Controles {

  // attributs
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;                    // clef primaire dans la BD

  // PHASER EST EN QWERTY
  private String haut = "W"; // touche pour se déplacer vers le haut
  private String gauche = "A"; // touche pour se déplacer vers la gauche
  private String bas = "S"; // touche pour se déplacer vers le bas
  private String droite = "D"; // touche pour se déplacer vers la droite
  private String attaquer = "Space"; // touche pour attaquer
  private String interagir = "F"; // touche pour intéragir
  private String prendre = "Q"; // touche pour prendre / poser un produit
  private String boutique = "B"; // touche pour accéder à la boutique
  private String recueil = "R"; // touche pour ouvrir le bestiaire / livre de recettes
  private String chat = "T"; // touche pour ouvrir le chat

  // constructeur
  public Controles() {
  }


  // getters
  public int getId() {
    return id;
  }

  public String getHaut() {
    return haut;
  }

  public String getGauche() {
    return gauche;
  }

  public String getBas() {
    return bas;
  }

  public String getDroite() {
    return droite;
  }

  public String getAttaquer() {
    return attaquer;
  }

  public String getInteragir() {
    return interagir;
  }

  public String getPrendre() {
    return prendre;
  }

  public String getBoutique() {
    return boutique;
  }

  public String getRecueil() {
    return recueil;
  }

  public String getChat() {
    return chat;
  }


  // setters
  public void setId(int id) {
    this.id = id;
  }


  public void setHaut(String toucheHaut) {
    this.haut = toucheHaut;
  }


  public void setGauche(String toucheGauche) {
    this.gauche = toucheGauche;
  }


  public void setBas(String toucheBas) {
    this.bas = toucheBas;
  }


  public void setDroite(String toucheDroite) {
    this.droite = toucheDroite;
  }


  public void setAttaquer(String attaquer) {
    this.attaquer = attaquer;
  }


  public void setInteragir(String interagir) {
    this.interagir = interagir;
  }


  public void setPrendre(String prendreOuPoser) {
    this.prendre = prendreOuPoser;
  }


  public void setBoutique(String accesBoutique) {
    this.boutique = accesBoutique;
  }


  public void setRecueil(String bestiaireOuLivreRecette) {
    this.recueil = bestiaireOuLivreRecette;
  }


  public void setChat(String chat) {
    this.chat = chat;
  }

}
