package illicodraco.project;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import illicodraco.project.repositories.*;
import illicodraco.project.beans.*;

@RestController
public class Facade {

    // attributs

    @Autowired
    BoutiqueRepository boutique_r;

    @Autowired
    ClasseRepository classe_r;

    @Autowired
    JoueurRepository joueur_r;

    @Autowired
    MonstreRepository monstre_r;

    @Autowired
    OutilRepository outil_r;

    @Autowired
    ParametresRepository param_r;

    @Autowired
    ProduitRepository produit_r;

    @Autowired
    RecetteRepository recette_r;

    @Autowired
    StatistiquesRepository stats_r;


    // méthodes

    @PostMapping("/joueurs")
    public void addJoueur(@RequestParam("joueur") Joueur joueur) {
        joueur_r.save(joueur);
    }

    @GetMapping("/joueurs")
    public Joueur getJoueur(@RequestParam("idj") int id_joueur) throws RuntimeException {
        Optional<Joueur> joueur = joueur_r.findById(id_joueur);
        if ( ! joueur.isPresent()) throw new RuntimeException("Joueur Inexistant");
        return joueur.get();
    }

    @GetMapping("/controles")
    public Controles getControlesFromJoueur(@RequestParam("idj") int id_joueur) throws RuntimeException {
        Joueur joueur = getJoueur(id_joueur);
        return joueur.getControles();
    }

    /* TODO (l'idée est là)
    @PostMapping("/achat")
    public Produit achatBoutique(@RequestParam("idj") int id_joueur, @RequestParam("arg") int argent, @RequestParam("idp") int id_produit) throws RuntimeException {
        Joueur joueur = getJoueur(id_joueur);
        Optional<Boutique> produitBoutique = boutique_r.findById(id_produit);
        if ( ! produitBoutique.isPresent()) throw new RuntimeException("Objet Inexistant dans la boutique");
        if (argent < produitBoutique.get().getPrix())  throw new RuntimeException("Solde insuffisant !");
        
    }
    */


}