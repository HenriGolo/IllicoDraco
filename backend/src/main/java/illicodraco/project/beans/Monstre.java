package illicodraco.project.beans;

import jakarta.persistence.*;

// Classe java pour gérer l'entité "monstre"
@Entity
public class Monstre {

  // attributs
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;             // clef primaire dans la BD

  private String nom;         // nom du monstre

  @OneToOne
  private Statistiques stats; // statistiques du monstre

  private String path;        // path vers la texture du monstre

  @ManyToOne
  private Produit produit;    // produit laché par le monstre à sa mort

  private float vitesse;      // vitesse d'actualisation du déplacement du monstre

  // constructeur
  public Monstre() {
  }


  // getters
  public int getId() {
    return id;
  }

  public String getNom() {
    return nom;
  }

  public Statistiques getStats() {
    return stats;
  }

  public String getPath() {
    return path;
  }

  public Produit getProduit() {
    return produit;
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

  public void setStats(Statistiques stats) {
    this.stats = stats;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public void setProduit(Produit produit) {
    this.produit = produit;
  }

  public void setVitesse(Float vitesse) {
    this.vitesse = vitesse;
  }

}
