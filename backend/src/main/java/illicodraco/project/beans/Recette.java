package illicodraco.project.beans;

import jakarta.persistence.*;

import java.util.Collection;

// Classe java gérant l'entité "Recette"
@Entity
public class Recette {

  // attributs
  @Id
  private String nomPlat;

  @OneToOne
  @MapsId
  @JoinColumn(name = "plat_nom")
  private Produit plat;                       // plat final obtenu

  @ManyToMany(fetch = FetchType.EAGER)
  private Collection<Produit> ingredients;    // liste des ingrédients

  @ManyToOne
  private Outil outil;                        // outil nécessaire pour la recette

  // constructeur
  public Recette() {
  }


  // getters
  public String getNom() {
    return plat.getNom();
  }

  public Collection<Produit> getIngredients() {
    return ingredients;
  }

  public Produit getPlat() {
    return plat;
  }

  public Outil getOutil() {
    return outil;
  }


  // setters
  public void setNom(String nom) {
    plat.setNom(nom);
  }

  public void setIngredients(Collection<Produit> ingredients) {
    this.ingredients = ingredients;
  }


  public void setPlat(Produit plat) {
    this.plat = plat;
  }

  public void setOutil(Outil outil) {
    this.outil = outil;
  }

}
