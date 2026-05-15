package illicodraco.project.beans;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Collection;

// Classe java pour gérer l'entité "joueur"
@Entity
public class Joueur {

  // attributs
  @Id
  private String pseudo;      // pseudonyme du joueur (clef primaire dans la BD)

  //@Transient
  //private Avatar avatar;      // Avatar du joueur

  @OneToOne
  private Controles controles;      // controles du joueur

  @ManyToMany(fetch = FetchType.EAGER)
  private Collection<Monstre> bestiaire;   // bestiaire du joueur

  @ManyToMany(fetch = FetchType.EAGER)
  private Collection<Recette> livreRecettes;   // livre de recettes du joueur

  @ManyToMany(mappedBy = "joueurs", fetch = FetchType.EAGER)
  @JsonBackReference
  private Collection<Parametres> parties;

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

  /*public Avatar getAvatar() {
    return avatar;
  }*/


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

  public Collection<Parametres> getParties() {
    return parties;
  }

  public void setParties(Collection<Parametres> parties) {
    this.parties = parties;
  }

  /*public void setAvatar(Avatar avatar) {
    this.avatar = avatar;
  }*/

}
