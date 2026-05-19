package illicodraco.project.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

// Classe java gérant l'entité "produit"
@Entity
public class Produit {

  // attributs
  @Id
  private String nom;     // nom du produit

  private int prix;

  private boolean fini;


  // constructeur
  public Produit() {
  }

  public Produit(String nom) {
    this();
    setNom(nom);
  }


  // getters
  /*public int getId() {
    return id;
  }*/

  public String getNom() {
    return nom;
  }

  // setters
  /*public void setId(int id) {
    this.id = id;
  }*/

  public void setNom(String nom) {
    this.nom = nom;
  }

  public int getPrix() {
    return prix;
  }

  public void setPrix(int prix) {
    this.prix = prix;
  }

  public boolean isFini() {
    return fini;
  }

  public void setFini(boolean fini) {
    this.fini = fini;
  }
}
