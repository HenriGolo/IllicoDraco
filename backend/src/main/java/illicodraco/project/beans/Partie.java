package illicodraco.project.beans;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

// Classe java gérant l'entité "paramètres"
@Entity
public class Partie {

  // attributs
  @Id
  private String code;                // code de la partie

  private int nbJoueurs;              // nb de joueurs dans la partie

  @ManyToMany(fetch = FetchType.EAGER)
  @JsonManagedReference
  private Collection<Joueur> joueurs; // joueurs connectés dans la partie

  private float vitesseMonstres;      // facteur multiplicatif de la vitesse des monstres

  private float tempsEcoule;          // temps écoulé depuis le début de la partie/ du lobby

  private int argent;                 // argent global des joueurs dans la partie

  private float satisfaction;         // score de satisfaction client
/*

  @OneToMany
  private Collection<Produit> marmite; // liste des ingrédients dans la marmite

  @OneToMany
  private Collection<Produit> coffre; // liste des produits dans le coffre
//*/

  // constructeur
  public Partie() {
  }


  // getters
  /*public int getId() {
    return id;
  }*/

  public float getVitesseMonstres() {
    return vitesseMonstres;
  }

  public float getTempsEcoule() {
    return tempsEcoule;
  }

  public int getArgent() {
    return argent;
  }

  public float getSatisfaction() {
    return satisfaction;
  }

  public String getCode() {
    return code;
  }

  public int getNbJoueurs() {
    return nbJoueurs;
  }

  public Collection<Joueur> getJoueurs() {
    return joueurs;
  }

  /*
  public Collection<Produit> getCoffre() {
    return coffre;
  }//*/

  public Collection<Produit> getMarmite() {
    return marmite;
  }

  // setters
  /*public void setId(int id) {
    this.id = id;
  }*/

  public void setCode(String code) {
    this.code = code;
  }

  public void setNbJoueurs(int nbj) {
    this.nbJoueurs = nbj;
  }

  public void setJoueurs(Collection<Joueur> js) {
    this.joueurs = js;
  }

  public void addJoueurs(Joueur joueur) {
    if (joueurs == null) joueurs = new ArrayList<>();
    this.joueurs.add(joueur);
  }

  public void setVitesseMonstres(float vitesseMonstres) {
    this.vitesseMonstres = vitesseMonstres;
  }

  public void setTempsEcoule(float tempsEcoule) {
    this.tempsEcoule = tempsEcoule;
  }

  public void setArgent(int argent) {
    this.argent = argent;
  }

  public void setSatisfaction(float satisfaction) {
    this.satisfaction = satisfaction;
  }

  /*
  public void setCoffre(Collection<Produit> coffre) {
    this.coffre = coffre;
  }//*/

}
