package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository des Produits
public interface ProduitRepository extends JpaRepository<Produit,Integer> {

    Produit save(Produit produit);
    
    Optional<Produit> findById(Integer id);
    
    Collection<Produit> findAll();
    
    Long count();

}