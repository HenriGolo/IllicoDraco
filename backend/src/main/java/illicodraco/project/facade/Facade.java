package illicodraco.project.facade;

import illicodraco.project.beans.*;
import illicodraco.project.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController("Facade")
public class Facade {


  // attributs
  @Autowired
  BoutiqueRepository boutiqueRepo;
  @Autowired
  ClasseRepository classeRepo;
  @Autowired
  JoueurRepository joueurRepo;
  @Autowired
  MonstreRepository monstreRepo;
  @Autowired
  OutilRepository outilRepo;
  @Autowired
  PartieRepository partieRepo;
  @Autowired
  ProduitRepository produitRepo;
  @Autowired
  RecetteRepository recetteRepo;
  @Autowired
  StatistiquesRepository statsRepo;
  @Autowired
  ControlesRepository controlesRepo;

  // méthodes

  @GetMapping("/login")
  public Joueur login(@RequestParam("pseudo") String pseudo) {
    return joueurRepo.findById(pseudo).orElseGet(() -> {
      Controles controles = new Controles();
      controlesRepo.save(controles);
      Joueur joueur = new Joueur();
      joueur.setPseudo(pseudo);
      joueur.setControles(controles);
      joueurRepo.save(joueur);
      return joueur;
    });
  }

  @PostMapping("/joueurs")
  public void addJoueur(@RequestBody Joueur joueur) {
    joueurRepo.save(joueur);
  }

  @GetMapping("/joueurs")
  public Joueur getJoueur(@RequestParam("pseudo") String pseudo) {
    return joueurRepo.findById(pseudo).orElseThrow(() -> new EntityNotFound("Joueur inexistant"));
  }

  @GetMapping("/controles")
  public Controles getControlesFromJoueur(@RequestParam("pseudo") String pseudo) {
    return getJoueur(pseudo).getControles();
  }

  @PostMapping("/controles")
  public Controles setControlesOfJoueur(@RequestParam("pseudo") String pseudo, @RequestBody Controles controls) {
    Joueur joueur = getJoueur(pseudo);
    joueur.setControles(controls);
    controlesRepo.save(controls);
    joueurRepo.save(joueur);
    return controls;
  }

  @GetMapping("/partie")
  public Partie getPartie(@RequestParam("game_id") String game_id) {
    return partieRepo.findById(game_id).orElseThrow(() -> new EntityNotFound("Partie inexistante"));
  }

  @PostMapping("/partie")
  public void setParametres(@RequestBody Partie partie) {
    partieRepo.save(partie);
  }

  @PostMapping("/achat")
  public Produit achatBoutique(@RequestParam("argent") int argent, @RequestParam("idp") int id_produit) {
    Optional<Boutique> produitBoutique = boutiqueRepo.findById(id_produit);
    if (produitBoutique.isEmpty()) throw new EntityNotFound("Objet inexistant dans la boutique");
    Boutique boutique = produitBoutique.get();
    Example<Produit> example = Example.of(new Produit(boutique.getNom()));
    Produit produit = produitRepo.findOne(example).orElseThrow(() -> new EntityNotFound("Produit inexistant"));
    if (argent < boutique.getPrix()) throw new EntityNotFound("Solde insuffisant !");
    return produit;
  }

  @GetMapping("/classes")
  public Collection<Classe> getAllClasses() {
    return classeRepo.findAll();
  }

  @PostMapping("/classes")
  public void ajoutClasse(@RequestBody Classe classe) {
    classeRepo.save(classe);
  }

  @GetMapping("/monstres")
  public Collection<Monstre> getMonstre() {
    return monstreRepo.findAll();
  }

  @GetMapping("/outils")
  public Collection<Outil> getOutils() {
    return outilRepo.findAll();
  }

  /**
   * Récupère uniquement les produits qui possèdent un certain ingrédient en entrée ou en sortie
   *
   * @param produit_in_nom  id d'un {@link Produit ingrédient} d'entrée à chercher
   * @param produit_out_nom id d'un {@link Produit ingrédient} de sortie à chercher
   * @return une {@link Collection<Recette>} qui vérifie le critère de recherche
   */
  @GetMapping("/recettes/{input}/{output}")
  public Collection<Recette> getRecettes(
      @PathVariable("input") String produit_in_nom,
      @PathVariable("output") String produit_out_nom
  ) {
    Collection<Recette> recettes = recetteRepo.findAll();
    return recettes.stream().filter(recette ->
        recette.getPlat().getNom().equals(produit_out_nom)
            && recette.getIngredients().stream().anyMatch(ing ->
            ing.getNom().equals(produit_in_nom))).toList();
  }

  /**
   * @see #getRecettes(String, String)
   */
  @GetMapping("/recettes/{input}")
  public Collection<Recette> getRecettes(@PathVariable("input") String nom) {
    return getRecettes(nom, nom);
  }

  @GetMapping("/stats")
  public Statistiques getStats(@RequestParam("id") int stats_id) {
    return statsRepo.findById(stats_id).orElseThrow(() -> new EntityNotFound("Statistiques inexistantes"));
  }

  @GetMapping("/create")
  public Partie createGame(@RequestParam("pseudo") String pseudo) {

    Random r = new Random();
    Collection<Partie> parties = partieRepo.findAll();
    boolean code_ok = false;
    String code = "XXXXXX";

    while (!code_ok) {
      code_ok = true;
      String c1 = r.nextInt(26) + "a";
      String c2 = r.nextInt(26) + "a";
      code = c1 + c2 + r.nextInt(10) + r.nextInt(10) + r.nextInt(10) + r.nextInt(10);

      for (Partie p : parties) {
        if (p.getCode().equals(code)) {
          code_ok = false;
        }
      }
    }

    Joueur joueur = login(pseudo);

    Partie partie = new Partie();
    partie.setCode(code);
    partie.setArgent(0);
    partie.setNbJoueurs(1);
    partie.addJoueurs(joueur);
    partie.setSatisfaction(0);
    partie.setTempsEcoule(0);
    partie.setVitesseMonstres(1);
    partieRepo.save(partie);

    return partie;
  }

  @GetMapping("/join")
  public Partie joinGame(@RequestParam("pseudo") String pseudo, @RequestParam("code") String code) {
    Optional<Partie> _partie = partieRepo.findById(code);
    if (_partie.isPresent()) {
      Partie partie = _partie.get();
      if (partie.getNbJoueurs() >= 4) {
        throw new FullGame("Partie déjà remplie !");
      } else {
        Joueur joueur = login(pseudo);
        Collection<Joueur> dejaPresents = partie.getJoueurs();
        for (Joueur _joueur : dejaPresents) {
          if (_joueur.getPseudo().equals(pseudo)) {
            return partie;
          }
        }
        partie.addJoueurs(joueur);
        partie.setNbJoueurs(partie.getJoueurs().toArray().length);
        partieRepo.save(partie);
        return partie;
      }
    } else {
      throw new EntityNotFound("Code invalide !");
    }
  }

  @GetMapping("/plat_random")
  public Produit getPlatRandom(){
    Collection<Recette> recettes = this.recetteRepo.findAll();
    int taille = recettes.size();
    Random r = new Random();
    int indice = r.nextInt(taille);
    int i = 0;
    for (Recette rct : recettes) {
      if (i == indice) {
        return rct.getPlat();
      }
      i++;
    }
    throw new EntityNotFound("Pas de recettes dans la BD");
  }

  @GetMapping("/coffre/{code}")
  public Collection<Produit> getCoffre(@PathVariable String code) {
    Optional<Partie> partie = this.partieRepo.findById(code);
    if (partie.isPresent()) { 
      return partie.get().getCoffre();
    } else {
      throw new EntityNotFound("Partie inexistante");
    } 
  }  

  @PostMapping("/set_coffre")
  public void setCoffre(@RequestParam("code") String code,@RequestParam("produit") Produit produit) {
    Optional<Partie> partie = this.partieRepo.findById(code);
    if (partie.isPresent()) { 
      Collection<Produit> nouvCoffre = partie.get().getCoffre();
      nouvCoffre.add(produit);
      partie.get().setCoffre(nouvCoffre);
      partieRepo.save(partie);
    } else {
      throw new EntityNotFound("Partie inexistante");
    } 

  }

}
