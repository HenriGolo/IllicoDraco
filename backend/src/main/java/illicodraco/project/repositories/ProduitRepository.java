package illicodraco.project.repositories;

import illicodraco.project.beans.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository des Produits
public interface ProduitRepository extends JpaRepository<Produit, Integer> {

  Produit save(Produit produit);

  Optional<Produit> findById(Integer id);

  List<Produit> findAll();

  long count();

}
