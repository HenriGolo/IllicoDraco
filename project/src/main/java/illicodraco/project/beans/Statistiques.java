package illicodraco.project.beans;

// Classe java contenant les statistiques communes aux montres et aux joueurs
@Entity
public class Statistiques {

    // attributs
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;         // clef primaire dans la BD

    private int vie;        // points de vie du monstre/joueur

    private int attaque;    // attaque du monstre/joueur

    private int defense;    // défense du monstre/joueur


    // constructeur
    public Statistiques() {}


    // getters
    public int getId() {
        return id;
    }

    public int getVie() {
        return vie;
    }

    public int getAttaque() {
        return attaque;
    }

    public int getDefense() {
        return defense;
    }


    // setters
    public void setId(int id) {
        this.id = id;
    }

    public void setVie(int vie) {
        this.vie = vie;
    }

    public void setAttaque(int attaque) {
        this.attaque = attaque;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }

}