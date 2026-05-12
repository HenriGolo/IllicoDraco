package illicodraco.project.beans;

import jakarta.persistence.*;

// Classe java pour gérer l'entité "avatar"
// SANS ANNOTATIONS JPA CAR DYNAMIQUE ?
public class Avatar {

    // attributs
    private int id;                 // clef primaire dans la BD (INUTILE ?)

    private Joueur joueur;          // joueur possédant l'avatar (joueur = owner)

    private Classe classe;          // classe de l'avatar du joueur

    private Produit produit;        // produit porté par le joueur

    // constructeur
    public Avatar() {
    }


    // getters
    public int getId() {
        return id;
    }

    public Joueur getJoueur() {
        return joueur;
    }

    public Produit getProduit() {
        return produit;
    }

    public Classe getClasse() {
        return classe;
    } 


    // setters
    public void setId(int id) {
        this.id = id;
    }

    public void setJoueur(Joueur joueur) {
        this.joueur = joueur;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }

}
