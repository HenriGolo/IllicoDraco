package illicodraco.project.database;

import illicodraco.project.beans.*;
import illicodraco.project.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;
import java.util.Random;

@RestController("Facade")
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
  public void addJoueur(@RequestBody Joueur joueur) {
    joueur_r.save(joueur);
  }

  @GetMapping("/joueurs")
  public Joueur getJoueur(@RequestParam("pseudo") String pseudo) {
    return joueur_r.findById(pseudo).orElseThrow(() -> new EntityNotFound("Joueur inexistant"));
  }

  @GetMapping("/controles")
  public Controles getControlesFromJoueur(@RequestParam("pseudo") String pseudo) {
    return getJoueur(pseudo).getControles();
  }

  @PostMapping("/controles")
  public void setControlesOfJoueur(@RequestParam("pseudo") String pseudo, @RequestParam("ctrls") Controles ctrls) {
    Joueur joueur = getJoueur(pseudo);
    joueur.setControles(ctrls);
    joueur_r.save(joueur);
  }

  @GetMapping("/params")
  public Parametres getParametres(@RequestParam("game_id") String game_id) {
    return param_r.findById(game_id).orElseThrow(() -> new EntityNotFound("Partie inexistante"));
  }

  @PostMapping("/params")
  public void setParametres(@RequestBody Parametres params) {
    param_r.save(params);
  }

  @PostMapping("/achat")
  public Produit achatBoutique(@RequestParam("argent") int argent, @RequestParam("idp") int id_produit) {
    Optional<Boutique> produitBoutique = boutique_r.findById(id_produit);
    if (produitBoutique.isEmpty()) throw new EntityNotFound("Objet inexistant dans la boutique");
    Boutique boutique = produitBoutique.get();
    Example<Produit> example = Example.of(new Produit(boutique.getNom()));
    Produit produit = produit_r.findOne(example).orElseThrow(() -> new EntityNotFound("Produit inexistant"));
    if (argent < boutique.getPrix()) throw new EntityNotFound("Solde insuffisant !");
    return produit;
  }

  @GetMapping("/classes")
  public Collection<Classe> getAllClasses() {
    return classe_r.findAll();
  }

  @PostMapping("/classes")
  public void ajoutClasse(@RequestBody Classe classe) {
    classe_r.save(classe);
  }

  @GetMapping("/monstres")
  public Collection<Monstre> getMonstre() {
    return monstre_r.findAll();
  }

  @GetMapping("/outils")
  public Collection<Outil> getOutils() {
    return outil_r.findAll();
  }

  /**
   * Récupère uniquement les produits qui possèdent un certain ingrédient en entrée ou en sortie
   *
   * @param produit_in_id  id d'un {@link Produit ingrédient} d'entrée à chercher
   * @param produit_out_id id d'un {@link Produit ingrédient} de sortie à chercher
   * @return une {@link Collection<Recette>} qui vérifie le critère de recherche
   */
  @GetMapping("/recettes/{input}/{output}")
  public Collection<Recette> getRecettes(
      @PathVariable("input") int produit_in_id,
      @PathVariable("output") int produit_out_id
  ) {
    Collection<Recette> recettes = recette_r.findAll();
    return recettes.stream().filter(recette ->
        recette.getPlat().getId() == produit_out_id
            && recette.getIngredients().stream().anyMatch(ing ->
            ing.getId() == produit_in_id)).toList();
  }

  /**
   * @see #getRecettes(int, int)
   */
  @GetMapping("/recettes/{input}")
  public Collection<Recette> getRecettes(@PathVariable("input") int id) {
    return getRecettes(id, id);
  }

  @GetMapping("/stats")
  public Statistiques getStats(@RequestParam("id") int stats_id) {
    return stats_r.findById(stats_id).orElseThrow(() -> new EntityNotFound("Statistiques inexistantes"));
  }

  @GetMapping("/create")
  public String createGame(@RequestParam("pseudo") String pseudo) {

    Random r = new Random();
    Collection<Parametres> params = param_r.findAll();
    boolean nok = true;
    String code = "XXXXXX";

    while (nok) {

      nok = false;
      String c1 = Integer.toString(r.nextInt(26)) + "a";
      String c2 = Integer.toString(r.nextInt(26)) + "a";
      code = c1 + c2 + Integer.toString(r.nextInt(10)) + Integer.toString(r.nextInt(10)) + Integer.toString(r.nextInt(10)) + Integer.toString(r.nextInt(10));

      for (Parametres p : params) {
        if (p.getCode().equals(code)) {
          nok = true;
        }
      }
    }

    Parametres parametres = new Parametres();
    parametres.setArgent(0);
    parametres.setCode(code);
    parametres.setNbJoueurs(1);
    parametres.setSatisfaction(0);
    parametres.setTempsEcoule(0);
    parametres.setVitesseMonstres(1);
    param_r.save(parametres);

    return code;
  }

  @GetMapping("/join/")
  public int joinGame(@RequestParam("pseudo") String pseudo, @RequestParam("code") String code) {
    Optional<Parametres> params = param_r.findById(code);
    if (params.isPresent()) {
      Parametres partie = params.get();
      if (partie.getNbJoueurs() >= 4) {
        throw new FullGame("Partie déjà remplie !");
      } else {
        Optional<Joueur> ojoueur = joueur_r.findById(pseudo);
        Joueur joueur;
        if (ojoueur.isPresent()) joueur = ojoueur.get();
        else {
          joueur = new Joueur();
          joueur.setPseudo(pseudo);
        }
        partie.addJoueurs(joueur);
        int nbj = partie.getNbJoueurs() + 1;
        partie.setNbJoueurs(nbj);
        param_r.save(partie);
        return nbj;
      }
    } else {
      throw new EntityNotFound("Code invalide !");
    }
  }

}
