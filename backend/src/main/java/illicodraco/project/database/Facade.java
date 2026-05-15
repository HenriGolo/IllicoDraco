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
  @Autowired BoutiqueRepository boutique_r;
  @Autowired ClasseRepository classe_r;
  @Autowired JoueurRepository joueur_r;
  @Autowired MonstreRepository monstre_r;
  @Autowired OutilRepository outil_r;
  @Autowired ParametresRepository param_r;
  @Autowired ProduitRepository produit_r;
  @Autowired RecetteRepository recette_r;
  @Autowired StatistiquesRepository stats_r;
  @Autowired ControlesRepository controles_r;

  // méthodes

  @GetMapping("/create_joueur")
  public Joueur createJoueur(@RequestParam("pseudo") String pseudo) {
    Controles controles = new Controles();
    controles_r.save(controles);
    Joueur joueur = new Joueur();
    joueur.setPseudo(pseudo);
    joueur.setControles(controles);
    joueur_r.save(joueur);
    return joueur;
  }

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
  public Parametres createGame(@RequestParam("pseudo") String pseudo) {

    Random r = new Random();
    Collection<Parametres> params = param_r.findAll();
    boolean code_ok = false;
    String code = "XXXXXX";

    while (!code_ok) {
      code_ok = true;
      String c1 = r.nextInt(26) + "a";
      String c2 = r.nextInt(26) + "a";
      code = c1 + c2 + r.nextInt(10) + r.nextInt(10) + r.nextInt(10) + r.nextInt(10);

      for (Parametres p : params) {
        if (p.getCode().equals(code)) {
          code_ok = false;
        }
      }
    }

    Joueur joueur = joueur_r.findById(pseudo).orElseGet(() -> createJoueur(pseudo));

    Parametres partie = new Parametres();
    partie.setCode(code);
    partie.setArgent(0);
    partie.setNbJoueurs(1);
    partie.addJoueurs(joueur);
    partie.setSatisfaction(0);
    partie.setTempsEcoule(0);
    partie.setVitesseMonstres(1);
    param_r.save(partie);

    return partie;
  }

  @GetMapping("/join")
  public Parametres joinGame(@RequestParam("pseudo") String pseudo, @RequestParam("code") String code) {
    Optional<Parametres> params = param_r.findById(code);
    if (params.isPresent()) {
      Parametres partie = params.get();
      if (partie.getNbJoueurs() >= 4) {
        throw new FullGame("Partie déjà remplie !");
      } else {
        Joueur joueur = joueur_r.findById(pseudo).orElseGet(() -> createJoueur(pseudo));
        Collection<Joueur> dejaPresents = partie.getJoueurs();
        for (Joueur _joueur : dejaPresents) {
          if (_joueur.getPseudo().equals(pseudo)) {
            return partie;
          }
        }
        partie.addJoueurs(joueur);
        partie.setNbJoueurs(partie.getJoueurs().toArray().length);
        param_r.save(partie);
        return partie;
      }
    } else {
      throw new EntityNotFound("Code invalide !");
    }
  }

}
