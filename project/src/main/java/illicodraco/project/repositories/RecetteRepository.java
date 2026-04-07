package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository des Recettes
public interface RecetteRepository extends JpaRepository<Recette,Integer> {

    Recette save(Recette recette);
    
    Optional<Recette> findById(Integer id);
    
    Collection<Recette> findAll();
    
    Long count();

}