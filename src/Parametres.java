package src;

import java.util.Collection;

// Classe java gérant l'entité "paramètres"

public class Parametres {

    // attributs
    private int id;                     // clef primaire dans la BD

    private float vitesseMonstres;      // facteur multiplicatif de la vitesse des monstres

    private float tempsEcoule;          // temps écoulé depuis le début de la partie/ du lobby

    private int argent;                 // argent global des joueurs dans la partie

    private float satisfaction;         // score de satisfaction client

    private Collection<Produit> coffre; // liste des produits dans le coffre


    // constructeur
    public Parametres() {}


    // getters
    public int getId() {
        return id;
    }

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

    public Collection<Produit> getCoffre() {
        return coffre;
    }


    // setters
    public void setId(int id) {
        this.id = id;
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

    public void setCoffre(Collection<Produit> coffre) {
        this.coffre = coffre;
    }

}