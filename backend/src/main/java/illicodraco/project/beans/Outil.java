package illicodraco.project.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// Classe java gérant l'entité "outil"
@Entity
public class Outil {

  // attributs
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;         // clef primaire dans la BD

  private String nom;     // nom de l'outil

  private String path;    // path vers la texture de l'outil

  private float vitesse;  // vitesse de "travail" de l'outil

  // constructeur
  public Outil() {
  }


  // getters
  public int getId() {
    return id;
  }

  public String getNom() {
    return nom;
  }

  public String getPath() {
    return path;
  }

  public Float getVitesse() {
    return vitesse;
  }


  // setters
  public void setId(int id) {
    this.id = id;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public void setVitesse(Float vitesse) {
    this.vitesse = vitesse;
  }

}
