package illicodraco.project.database;

import illicodraco.project.beans.*;
import illicodraco.project.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

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
  public void addJoueur(@RequestBody Joueur joueur) {
    joueur_r.save(joueur);
  }

  @GetMapping("/joueurs")
  public Joueur getJoueur(@RequestParam("idj") int id_joueur) {
    return joueur_r.findById(id_joueur).orElseThrow(() -> new EntityNotFound("Joueur inexistant"));
  }

  @GetMapping("/controles")
  public Controles getControlesFromJoueur(@RequestParam("idj") int id_joueur) {
    return getJoueur(id_joueur).getControles();
  }

  @PostMapping("/controles")
  public void setControlesOfJoueur(@RequestParam("idj") int id_joueur, @RequestParam("ctrls") Controles ctrls) {
    Joueur joueur = getJoueur(id_joueur);
    joueur.setControles(ctrls);
    joueur_r.save(joueur);
  }

  @GetMapping("/params")
  public Parametres getParametres(@RequestParam("game_id") int game_id) {
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

}
