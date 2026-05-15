package illicodraco.project.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// Classe java gérant l'entité "Boutique"
@Entity
public class Boutique {

  // attributs
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;         // clef primaire dans la BD

  private String nom;     // nom de l'objet dans la boutique

  private int prix;       // prix de l'objet dans la boutique

  private String type_;


  // constructeur
  public Boutique() {
  }


  // getters
  public int getId() {
    return id;
  }

  public String getNom() {
    return nom;
  }

  public int getPrix() {
    return prix;
  }

  public String getType_() {
    return type_;
  }


  // setters
  public void setId(int id) {
    this.id = id;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public void setPrix(int prix) {
    this.prix = prix;
  }

  public void setType_(String type_) {
    this.type_ = type_;
  }

}
