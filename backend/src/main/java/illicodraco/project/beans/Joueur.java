package illicodraco.project.beans;

import jakarta.persistence.*;

import java.util.Collection;

// Classe java pour gérer l'entité "joueur"
@Entity
public class Joueur {

  // attributs
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  // private int id;             // clef primaire dans la BD
  private String pseudo;      // pseudonyme du joueur (clef primaire dans la BD)

  @Transient
  private Avatar avatar;      // Avatar du joueur

  @OneToOne
  private Controles controles;      // controles du joueur

  @OneToMany
  private Collection<Monstre> bestiaire;   // bestiaire du joueur

  @OneToMany
  private Collection<Recette> livreRecettes;   // livre de recettes du joueur

    /*@OneToOne
    private Produit produit;    // produit porté par le joueur
    */

  // constructeur
  public Joueur() {
  }


  // getters
  /*public int getId() {
    return id;
  }*/

  public String getPseudo() {
    return pseudo;
  }

  public Collection<Recette> getLivreRecette() {
    return livreRecettes;
  }

  public Collection<Monstre> getBestiaire() {
    return bestiaire;
  }

  public Controles getControles() {
    return controles;
  }

  public Avatar getAvatar() {
    return avatar;
  }


  // setters
  /*public void setId(int id) {
    this.id = id;
  }*/

  public void setPseudo(String pseudo) {
    this.pseudo = pseudo;
  }

  public void setLivreRecette(Collection<Recette> livreRecettes) {
    this.livreRecettes = livreRecettes;
  }

  public void setBestiaire(Collection<Monstre> bestiaire) {
    this.bestiaire = bestiaire;
  }

  public void setControles(Controles controles) {
    this.controles = controles;
  }

  public void setAvatar(Avatar avatar) {
    this.avatar = avatar;
  }

}
