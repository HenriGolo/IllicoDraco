package illicodraco.project.beans;

// Classe java gérant l'entité "produit"
@Entity
public class Produit {

    // attributs
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;         // clef primaire dans la BD

    private String nom;     // nom du produit

    private String path;    // path vers la texture du produit


    // constructeur
    public Produit() {}


    // getters
    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getPath() {
        return path;
    }


    // setters
    public void setId(int id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPath(String path) {
        this.path = path;
    }



}