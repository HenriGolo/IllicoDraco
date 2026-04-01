package src;

// Classe java gérant l'entité "classe"

public class Classe {

    // attributs
    private int id;         // clef primaire dans la BD

    private String nom;     // nom de la classe

    private String path;    // path vers la texture du joueur de cette classe


    // constructeur
    public Classe() {}


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