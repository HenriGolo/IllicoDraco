package illicodraco.project.beans;

import jakarta.persistence.*;

// Classe java pour gérer l'entité "joueur"
@Entity
public class Joueur {

  // attributs
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;             // clef primaire dans la BD

  private String pseudo;      // pseudonyme du joueur

  @OneToOne
  private Controles controles;      // controles du joueur

    /*@OneToOne
    private Produit produit;    // produit porté par le joueur
    */

  // constructeur
  public Joueur() {
  }


  // getters
  public int getId() {
    return id;
  }

  public String getPseudo() {
    return pseudo;
  }

    /*public Statistiques getStats() {
        return stats;
    }*/

  public Controles getControles() {
    return controles;
  }

    /*public Produit getProduit() {
        return produit;
    }*/


  // setters
  public void setId(int id) {
    this.id = id;
  }

  public void setPseudo(String pseudo) {
    this.pseudo = pseudo;
  }

    /*public void setStats(Statistiques stats) {
        this.stats = stats;
    }*/

  public void setControles(Controles controles) {
    this.controles = controles;
  }

    /*public void setProduit(Produit produit) {
        this.produit = produit;
    }*/

}
