package illicodraco.project.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

// Classe java gérant l'entité "outil"
@Entity
public class Outil {

  // attributs
  @Id
  private String nom;     // nom de l'outil

  private int vitesse;  // vitesse de "travail" de l'outil

  // constructeur
  public Outil() {
  }


  // getters
  public String getNom() {
    return nom;
  }

  public int getVitesse() {
    return vitesse;
  }


  // setters
  public void setNom(String nom) {
    this.nom = nom;
  }

  public void setVitesse(int vitesse) {
    this.vitesse = vitesse;
  }

}
