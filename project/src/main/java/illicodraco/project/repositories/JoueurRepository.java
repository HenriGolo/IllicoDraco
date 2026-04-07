package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository du Joueur
public interface JoueurRepository extends JpaRepository<Joueur,Integer>{

    Joueur save(Joueur joueur);
    
    Optional<Joueur> findById(Integer id);
    
    Collection<Joueur> findAll();
    
    Long count();

}