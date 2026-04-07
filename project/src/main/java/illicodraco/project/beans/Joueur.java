package illicodraco.project.beans;

// Classe java pour gérer l'entité "joueur"
@Entity
public class Joueur {

    // attributs
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;             // clef primaire dans la BD

    private String pseudo;      // pseudonyme du joueur
    
    @ManyToOne
    private Classe classe;      // "classe" du joueur (contient ses statistiques)

    /*@OneToOne
    private Produit produit;    // produit porté par le joueur
    */

    // constructeur
    public Joueur() {}


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

    public Classe getClasse() {
        return classe;
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

    public void setClasse(Classe classe) {
        this.classe = classe;
    }

    /*public void setProduit(Produit produit) {
        this.produit = produit;
    }*/

}