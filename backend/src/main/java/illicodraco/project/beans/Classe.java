package illicodraco.project.beans;

import jakarta.persistence.*;

// Classe java gérant l'entité "classe"
@Entity
public class Classe {

  // attributs
  @Id
  private String nom;     // nom de la classe

  @OneToOne
  private Statistiques stats; // statistiques associées à la classe


  // constructeur
  public Classe() {
  }


  // getters
  public String getNom() {
    return nom;
  }

  // setters
  public void setNom(String nom) {
    this.nom = nom;
  }

}
